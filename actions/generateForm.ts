"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const generateForm = async (prevState: unknown, formData: FormData) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { success: false, message: "User not found" };
    }

    // Define schema for validation
    const schema = z.object({
      description: z.string().min(1, "Description is required"),
    });

    const result = schema.safeParse({
      description: formData.get("description") as string,
    });

    if (!result.success) {
      return {
        success: false,
        message: "Invalid form data",
        error: result.error.errors,
      };
    }

    const description = result.data.description;

    if (!process.env.GEMINI_API_KEY) {
      return { success: false, message: "Gemini API key not found" };
    }

    const prompt = `Generate a JSON response for a form with the following structure. Ensure the keys and format remain constant in every response.
{
  "formTitle": "string", // The title of the form
  "formFields": [        // An array of fields in the form
    {
      "label": "string", // The label to display for the field
      "name": "string",  // The unique identifier for the field (used for form submissions)
      "placeholder": "string" // The placeholder text for the field
    }
  ]
}
Requirements:
- Use only the given keys: "formTitle", "formFields", "label", "name", "placeholder".
- Always include at least 3 fields in the "formFields" array.
- Keep the field names consistent across every generation for reliable rendering.
- Provide meaningful placeholder text for each field based on its label.
        `;

    // Request Gemini API to generate the form content
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const resultAI = await model.generateContent(`${description} ${prompt}`);


    // Extract content safely
    const response = await resultAI.response;

    // Check if candidates exist
    if (!response.candidates || response.candidates.length === 0) {
      return { success: false, message: "No valid response from Gemini API" };
    }

    // Extract text content correctly
    const contentParts = response.candidates[0]?.content.parts;
    const formContent =
      contentParts?.map((part: any) => part.text).join("") || "";

    if (!formContent) {
      return { success: false, message: "Failed to generate form content" };
    }

    // Remove markdown formatting (```json ... ```)
    const cleanedFormContent = formContent.replace(/```json|```/g, "").trim();

    let formJsonData;
    try {
      formJsonData = JSON.parse(cleanedFormContent);
    } catch (error) {
      console.log("Error parsing JSON", error);
      return {
        success: false,
        message: "Generated form content is not valid JSON",
      };
    }

     // Save the generated form to the database
    const form = await prisma.form.create({
      data: {
        ownerId: user.id,
        content: formJsonData ? formJsonData : null,
      },
    });

    revalidatePath("/dashboard/forms"); // Optionally revalidate a path if necessary

    return {
      success: true,
      message: "Form generated successfully.",
      data: form,
    };
  } catch (error) {
    console.log("Error generating form", error);
    return {
      success: false,
      message: "An error occurred while generating the form",
    };
  }
};
