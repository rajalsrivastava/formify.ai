import { NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay-client"; // Import the Razorpay instance

export async function POST(req: Request) {
  try {
    const { price, userId, plan } = await req.json();

    // Validate required fields
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }
    if (!price || price <= 0) {
      return NextResponse.json(
        { error: "Invalid price amount" },
        { status: 400 }
      );
    }
    if (!plan) {
      return NextResponse.json({ error: "Plan is required" }, { status: 400 });
    }

    // Generate a unique receipt ID
    const receipt = `rcpt_${userId.slice(0, 10)}_${Date.now()
      .toString()
      .slice(-6)}`;

    // Create Razorpay order
    const options = {
      amount: price * 100, // Convert price to paise (smallest currency unit)
      currency: "INR",
      receipt: receipt, // Unique receipt ID (≤ 40 characters)
      payment_capture: 1, // Auto-capture payment
      notes: {
        userId,
        plan,
      },
    };

    const order = await razorpay.orders.create(options);

    // Return the order details to the client
    return NextResponse.json(
      {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { error: "Failed to create order. Please try again." },
      { status: 500 }
    );
  }
}
