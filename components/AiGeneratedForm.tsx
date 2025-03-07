"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { publishForm } from "@/actions/publishForm";
import FormPublisDialog from "./FormPublisDialog";
import { Fields, Form } from "@/types/form";

type Props = {
  form: Form ;
  isEditMode: boolean;
};
const AiGeneratedForm: React.FC<Props> = ({ form, isEditMode }) => {
  const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false);

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode) {
      await publishForm(form.id);
      setSuccessDialogOpen(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={isEditMode ? handlePublish : handleSubmit}>
        {form.content.formFields.map((item: Fields, index: number) => (
          <div key={index} className="mb-4">
            <Label>{item.label}</Label>
            <Input
              type="text"
              name={item.name}
              placeholder={item.placeholder}
              required={!isEditMode && true}
            />
          </div>
        ))}
        <Button type="submit">{isEditMode ? "Publish" : "Submit"}</Button>
      </form>
      <FormPublisDialog
        formId={form.id}
        open={successDialogOpen}
        onOpenChange={setSuccessDialogOpen}
      />
    </div>
  );
};

export default AiGeneratedForm;
