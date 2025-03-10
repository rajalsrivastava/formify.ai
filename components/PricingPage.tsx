"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { PricingPlan, pricingPlan } from "@/lib/pricingPlan";
import { Badge } from "./ui/badge";
import { useRouter } from "next/navigation";
import Script from "next/script";

type Props = {
  userId: string | undefined;
};

const PricingPage: React.FC<Props> = ({ userId }) => {
  const router = useRouter();

  const checkOutHandler = async (price: number, plan: string) => {
    if (!userId) {
      router.push("/login");
      return;
    }
    if (price === 0) {
      return;
    }

    try {
      // Call the API route to create a Razorpay order
      const response = await fetch("/api/razorpay/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price, userId, plan }),
      });

      const data = await response.json();

      // Check if the order was created successfully
      if (!data.orderId) {
        throw new Error("Failed to create order: No order ID returned");
      }

      // Initialize Razorpay
      const razorpay = new (window as any).Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Use PUBLIC key
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: "Formify.ai",
        description: `Payment for ${plan} plan`,
        image: "https://example.com/your_logo.png", // Add your logo URL
        handler: function (response: any) {
          alert(
            `Payment successful! Payment ID: ${response.razorpay_payment_id}`
          );
          // Redirect the user to a success page
          router.push("/success");
        },
        prefill: {
          name: "User Name", // Replace with dynamic user data if available
          email: "user@example.com", // Replace with dynamic user data
          contact: "1234567890", // Replace with dynamic user data
        },
        notes: { userId },
        theme: {
          color: "#3399cc", // Customize the theme color
        },
      });

      // Open Razorpay payment modal
      razorpay.open();

      // Handle payment failure
      razorpay.on("payment.failed", function (response: any) {
        alert(`Payment failed! Error: ${response.error.description}`);
        console.error("Payment failed:", response.error);
      });
    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("Payment initiation failed. Please try again.");
    }
  };

  return (
    <div>
      {/* Load Razorpay script */}
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload" // Load the script lazily
        onLoad={() => console.log("Razorpay SDK loaded")}
      />

      <div className="text-center mb-16">
        <h1 className="font-bold text-3xl">Plans and Pricing</h1>
        <p className="text-gray-500">
          Receive Unlimited credits when you pay early, and save your plan.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {pricingPlan.map((plan: PricingPlan, index: number) => (
          <Card
            className={`${
              plan.level === "Enterprise" && "bg-[#1c1c1c] text-white"
            } w-[350px] flex flex-col justify-between`}
            key={index}
          >
            <CardHeader className="flex flex-row items-center gap-2">
              <CardTitle>{plan.level}</CardTitle>
              {plan.level === "Pro" && (
                <Badge className="rounded-full bg-orange-600">🔥 Popular</Badge>
              )}
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-2xl font-bold">{plan.price}</p>
              <ul className="mt-4 space-y-2">
                {plan.services.map((item: string, index: number) => (
                  <li className="flex items-center" key={index}>
                    <span className="text-green-500 mr-2">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className={`${
                  plan.level === "Enterprise" && "text-black dark:text-white"
                } w-full cursor-pointer`}
                onClick={() =>
                  checkOutHandler(
                    plan.level === "Pro"
                      ? 79
                      : plan.level === "Enterprise"
                      ? 149
                      : 0,
                    plan.level
                  )
                }
              >
                Get started with {plan.level}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
