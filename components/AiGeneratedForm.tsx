import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type Props = {
  form: any;
  isEditMode: boolean;
};
const AiGeneratedForm: React.FC<Props> = ({ form, isEditMode }) => {
  return (
    <div>
      <form>
        {form.content.formFields.map((item: any, index: number) => (
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
    </div>
  );
};

export default AiGeneratedForm;
