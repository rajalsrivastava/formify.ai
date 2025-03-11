import crypto from "crypto";
import { createSubscription } from "@/actions/userSubscription";
import { NextResponse } from "next/server";

const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    // Validate environment variable
    if (!RAZORPAY_WEBHOOK_SECRET) {
      console.error("Razorpay webhook secret is missing!");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Read raw body and extract signature
    const rawBody = await req.text();
    const receivedSignature = req.headers.get("x-razorpay-signature");
    if (!receivedSignature) {
      console.error("Missing Razorpay signature header");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify signature
    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_WEBHOOK_SECRET)
      .update(rawBody)
      .digest("hex");
    if (expectedSignature !== receivedSignature) {
      console.error("Invalid Razorpay webhook signature!");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse and validate payload
    const body = JSON.parse(rawBody);
    console.log(
      `Webhook Received (${body.event}):`,
      JSON.stringify(body, null, 2)
    );

    if (!body.payload?.payment?.entity) {
      console.error("Invalid webhook payload: Missing order or payment entity");
      return NextResponse.json(
        { error: "Invalid webhook data" },
        { status: 400 }
      );
    }

    // Handle events
    if (body.event === "payment.captured") {
      console.log(
        "✅ Payment Authorized for Order:",
        body.payload.payment.entity.order_id
      );

      const userId = body.payload.payment.entity.notes?.userId;
      console.log("Extracted userId from webhook payload:", userId);
      if (!userId) {
        console.error("User ID missing in webhook payload");
        return NextResponse.json(
          { error: "Invalid webhook data" },
          { status: 400 }
        );
      }

      try {
        // Activate subscription
        await createSubscription({ userId });
        console.log("Subscription created successfully for user:", userId);
      } catch (error) {
        console.error(
          "Failed to create subscription:",
          error instanceof Error ? error.message : error
        );
        return NextResponse.json(
          { error: "Failed to create subscription" },
          { status: 500 }
        );
      }
    } else if (body.event === "payment.failed") {
      console.log(
        "❌ Payment Failed for Order:",
        body.payload.payment.entity.order_id
      );
      console.log(
        "Failure Reason:",
        body.payload.payment.entity.error_description ?? "No reason provided"
      );
    }

    return NextResponse.json({ status: "success" }, { status: 200 });
  } catch (error) {
    console.error(
      "Webhook Error:",
      error instanceof Error ? error.message : error
    );
    return NextResponse.json(
      { error: "Invalid webhook data" },
      { status: 400 }
    );
  }
}

