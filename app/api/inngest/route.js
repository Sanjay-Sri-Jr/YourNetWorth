import { serve } from "inngest/next";
import arcjet, { detectBot, shield } from "@arcjet/next";
import { NextResponse } from "next/server";
import { inngest } from "@/lib/inngest/client";
import {
  processRecurringTransaction,
  triggerRecurringTransactions,
  generateMonthlyReports,
  checkBudgetAlerts,
} from "@/lib/inngest/function";

if (!process.env.ARCJET_KEY) {
  throw new Error("ARCJET_KEY is missing");
}

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE", "GO_HTTP"],
    }),
  ],
});

// Create Inngest handler
const handler = serve({
  client: inngest,
  functions: [
    processRecurringTransaction,
    triggerRecurringTransactions,
    generateMonthlyReports,
    checkBudgetAlerts,
  ],
});

// Wrap POST
export async function POST(req)
{
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  return handler(req);
}

// Let GET & PUT pass normally
export const GET = handler;
export const PUT = handler;
