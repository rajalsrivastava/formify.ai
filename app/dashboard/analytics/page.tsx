import { getFormStats } from "@/actions/formStats";
import { getForms } from "@/actions/getForms";
import Analytics from "@/components/Analytics";
import React from "react";

const page = async () => {
  const data = await getFormStats();
  const forms = await getForms();
  const noOfForms = forms.data?.length || 0;

  return (
    <div>
      <Analytics noOfForms={noOfForms} noOfSubmissions={data | 0} />
    </div>
  );
};

export default page;
