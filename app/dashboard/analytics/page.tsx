import { getFormStats } from "@/actions/formStats";
import Analytics from "@/components/Analytics";
import React from "react";

const page = async () => {
  const data =await getFormStats();

  console.log(data);

  return (
    <div>
      <Analytics noOfSubmissions={0} />
    </div>
  );
};

export default page;
