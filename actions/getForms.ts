"use server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const getForms = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { success: false, message: "User not found" };
    }

    const forms = await prisma.form.findMany({
      where: {
        ownerId: user.id,
      },
    });

    if (forms.length === 0) {
      return { success: false, message: "No forms found", data: [] };
    }

    return { success: true, message: "Forms found", data: forms };
  } catch (error) {
    console.error("Error fetching forms:", error);

    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return { success: false, message: "Database error", error: errorMessage };
  }

};
