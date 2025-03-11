import { prisma } from "@/lib/prisma";

export const createSubscription = async ({ userId }: { userId: string }) => {
  try {
    const subscription = await prisma.subscription.create({
      data: {
        userId,
        subscribed: true,
      },
    });
    return subscription;
  } catch (error) {
    console.error("Failed to create subscription:", error);
    throw new Error("Failed to create subscription");
  }
};

export const getUserSubscription = async (userId: string) => {
  if (!userId) {
    throw new Error("Not authenticated");
  }

  try {
    const subscription = await prisma.subscription.findFirst({
      where: { userId },
    });

    return subscription ? subscription.subscribed : false;
  } catch (error) {
    console.error("Error fetching subscription:", error);
    throw new Error("Failed to fetch subscription");
  }
};
