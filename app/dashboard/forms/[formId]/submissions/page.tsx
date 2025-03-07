import SubmissionsDetails from "@/components/SubmissionDetails";
import prisma from "@/lib/prisma";
import React from "react";


const getSubmissions = async (formId: string) => {
  return await prisma.submissions.findMany({
    where: { formId: Number(formId) },
    include: { form: true },
  });
};
const Submissions = async ({ params }: { params: { formId: string } }) => {
  const formId = params.formId;

  const submissions = await getSubmissions(params.formId);

  if (!submissions || submissions.length === 0) {
    return <h1>No submissions found for form id {formId}</h1>;
  }
  return (
    <div>
      {submissions.map((submission: any, index: number) => (
        <SubmissionsDetails key={submission.id} submission={submission} index={index} />
      ))}
    </div>
  );
};

export default Submissions;
