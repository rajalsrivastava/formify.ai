import crypto from "crypto";
import { createSubscription } from "@/actions/userSubscription";
import { NextResponse } from "next/server";

const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const receivedSignature = req.headers.get("x-razorpay-signature");

    // Verify the Razorpay webhook signature
    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_WEBHOOK_SECRET)
      .update(rawBody)
      .digest("hex");

    if (expectedSignature !== receivedSignature) {
      console.error("Invalid Razorpay webhook signature!");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = JSON.parse(rawBody);
    console.log("Webhook Received:", JSON.stringify(body, null, 2));

    if (body.event === "order.paid") {
      console.log(
        "✅ Payment Authorized for Order:",
        body.payload.order.entity.id
      );

      const userId = body.payload.order.entity.notes?.userId;
      if (!userId) {
        console.error("User ID missing in webhook payload");
        return NextResponse.json(
          { error: "Invalid webhook data" },
          { status: 400 }
        );
      }

      // ✅ Activate Subscription
      await createSubscription({ userId });
    } else if (body.event === "payment.failed") {
      console.log(
        "❌ Payment Failed for Order:",
        body.payload.payment.entity.order_id
      );
    }

    return NextResponse.json({ status: "success" }, { status: 200 });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json(
      { error: "Invalid webhook data" },
      { status: 400 }
    );
  }
}
