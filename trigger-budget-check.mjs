import { inngest } from "./lib/inngest/client.js"; // Import the configured client

(async () => {
    try {
        console.log("Triggering budget check manually...");
        await inngest.send({
            name: "test.check.budgets",
            data: {},
        });
        console.log("Event sent!");
    } catch (error) {
        console.error("Error sending event:", error);
    }
})();
