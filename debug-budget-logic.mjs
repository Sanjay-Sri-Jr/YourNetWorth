import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";

const db = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

function isNewMonth(lastAlertDate, currentDate) {
    return (
        lastAlertDate.getMonth() !== currentDate.getMonth() ||
        lastAlertDate.getFullYear() !== currentDate.getFullYear()
    );
}

async function debugBudgetAlerts() {
    console.log("Starting Debug Budget Check...");

    try {
        const budgets = await db.budget.findMany({
            include: {
                user: true,
            },
        });

        console.log(`Found ${budgets.length} budgets.`);

        for (const budget of budgets) {
            console.log(`\nChecking Budget for User: ${budget.user.email} (Budget ID: ${budget.id})`);

            const startDate = new Date();
            startDate.setDate(1); // Start of current month
            startDate.setHours(0, 0, 0, 0); // Ensure start of day

            // Calculate total expenses
            const expenses = await db.transaction.aggregate({
                where: {
                    userId: budget.userId,
                    type: "EXPENSE",
                    date: {
                        gte: startDate,
                    },
                },
                _sum: {
                    amount: true,
                },
            });

            const totalExpenses = expenses._sum.amount?.toNumber() || 0;
            const budgetAmount = Number(budget.amount);
            const percentageUsed = (totalExpenses / budgetAmount) * 100;

            console.log(`- Start Date: ${startDate.toISOString()}`);
            console.log(`- Total Expenses (All Accounts): ${totalExpenses}`);
            console.log(`- Budget Amount: ${budgetAmount}`);
            console.log(`- Percentage Used: ${percentageUsed.toFixed(2)}%`);
            console.log(`- Last Alert Sent: ${budget.lastAlertSent ? budget.lastAlertSent.toISOString() : "Never"}`);
            console.log(`- Current Time: ${new Date().toISOString()}`);

            // Check if we should send an alert
            const thresholdMet = percentageUsed >= 80;
            const shouldSendNewAlert = !budget.lastAlertSent || isNewMonth(new Date(budget.lastAlertSent), new Date());

            console.log(`Explanation:`);
            console.log(`- Threshold >= 80%: ${thresholdMet}`);
            console.log(`- New Alert Needed (New Month or Never Sent): ${shouldSendNewAlert}`);

            if (thresholdMet && shouldSendNewAlert) {
                console.log(`>>> RESULT: Email SHOULD be sent.`);

                // Uncomment to actually test sending from this script
                /*
                console.log("Attempting to send real email...");
                await resend.emails.send({
                   from: "Your Net Worth <onboarding@resend.dev>",
                   to: budget.user.email,
                   subject: `DEBUG: Budget Alert`,
                   html: `<p>Debug alert. Used: ${percentageUsed.toFixed(1)}%</p>`
                 });
                 console.log("Email sent.");
                 */
            } else {
                console.log(`>>> RESULT: No email sent.`);
                if (!thresholdMet) console.log("  Reason: Threshold not reached.");
                else if (!shouldSendNewAlert) console.log("  Reason: Alert already sent this month.");
            }
        }

    } catch (e) {
        console.error("Error running debug script:", e);
    } finally {
        await db.$disconnect();
    }
}

debugBudgetAlerts();
