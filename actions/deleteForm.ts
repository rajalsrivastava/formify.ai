"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteForm = async (formId: number) => {
  try {
    // Check if the form exists before proceeding
    const form = await prisma.form.findUnique({
      where: { id: formId },
    });

    if (!form) {
      return { success: false, message: "Form not found" };
    }

    // Delete all related submissions first
    await prisma.submissions.deleteMany({
      where: { formId },
    });

    // Now delete the form
    await prisma.form.delete({
      where: { id: formId },
    });

    // Revalidate the dashboard forms list
    revalidatePath("/dashboard/forms");

    return { success: true, message: "Form deleted successfully." };
  } catch (error) {
    console.error("Error deleting form:", error);
    return {
      success: false,
      message: "An error occurred while deleting the form.",
    };
  }
};
