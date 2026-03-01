import { Resend } from 'resend';

console.log("Script starting...");

const key = process.env.RESEND_API_KEY;

if (!key) {
    console.error("No RESEND_API_KEY found in environment variables.");
    process.exit(1);
}

console.log(`Using Key: ${key.substring(0, 5)}...`);

const resend = new Resend(key);

(async function () {
    try {
        console.log("Attempting to send test email...");
        const response = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'delivered@resend.dev',
            subject: 'Test Email Verification',
            html: '<p>If you see this, the Resend API key is working correctly.</p>'
        });

        if (response.error) {
            console.error("API returned error:", response.error);
        } else {
            console.log("Email sent successfully!");
            console.log("Response:", JSON.stringify(response, null, 2));
        }
    } catch (error) {
        console.error("Exception occurred:", error);
        if (error.cause) console.error("Cause:", error.cause);
        if (error.stack) console.error("Stack:", error.stack);
    }
})();
