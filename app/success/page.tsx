"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const SuccessPage = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center max-h-screen">
      <h1 className="font-bold mb-4 text-4xl">Success</h1>
      <p>
        You have succesfully upgraded your plan and now start creating more
        forms.
      </p>
      <Button onClick={() => router.push("/")} variant={"link"}>
        Create more forms
      </Button>
    </div>
  );
};

export default SuccessPage;
