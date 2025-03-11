import AiGeneratedForm from "@/components/AiGeneratedForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {prisma} from "@/lib/prisma";
import { Form } from "@/types/form";
import React from "react";

const Edit = async ({ params }: { params: Promise<{ formId: string }> }) => {
  const formId = (await params).formId;

  if (!formId) {
    return <h1>No form id found for id {formId}</h1>;
  }

  const form = await prisma.form.findUnique({
  where: { id: Number(formId) },
});

if (!form) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h1 className="font-bold text-2xl text-center">Form not found</h1>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>No form exists with this ID.</p>
      </CardContent>
    </Card>
  );
}

// Ensure content is properly typed
const safeForm: Form = {
  ...form,
  content: typeof form.content === "string" ? JSON.parse(form.content) : form.content,
};

return (
  <Card>
    <CardHeader>
      <CardTitle>
        <h1 className="font-bold text-2xl text-center">{safeForm.content.formTitle}</h1>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <AiGeneratedForm form={safeForm} isEditMode={true} />
    </CardContent>
  </Card>
);
};

export default Edit;
