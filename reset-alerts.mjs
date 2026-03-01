import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function resetBudgetAlerts() {
    try {
        console.log("Resetting budget alerts...");
        const result = await db.budget.updateMany({
            data: {
                lastAlertSent: null, // Reset to null so it triggers again
            },
        });
        console.log(`Reset ${result.count} budget alerts.`);
    } catch (error) {
        console.error("Error resetting alerts:", error);
    } finally {
        await db.$disconnect();
    }
}

resetBudgetAlerts();
