import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Submission } from "@/types/submission";

type Props = {
  submission: Submission;
  index: number;
};
const SubmissionsDetails: React.FC<Props> = ({ submission, index }) => {

  return (
    <div>
      <h1 className="font-bold text-2xl mt-4 mb-1">Response - {index + 1}</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Questions</TableHead>
            <TableHead>Answers</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(submission?.content).map(
            ([key, value], index: number) => (
              <TableRow key={index}>
                <TableCell>{key}</TableCell>
                <TableCell>{String(value)}</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SubmissionsDetails;
