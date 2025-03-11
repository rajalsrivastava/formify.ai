import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import { Eye } from "lucide-react";

type Props = {
  noOfForms: number;
  noOfSubmissions: number;
};
const Analytics:React.FC<Props> = ({noOfForms,noOfSubmissions}) => {
  return (
    <div>
      <Card className="w-[350px] shadow-md shadow-yellow-600">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-bold">Form Analytics📊</CardTitle>
          {/* <Eye /> */}
        </CardHeader>
        <CardContent>
          <p>Total number of generated forms.</p>
          <div>{noOfForms}</div>
        </CardContent>
        <CardContent>
          <p>Total submissions to your forms.</p>
          <div>{noOfSubmissions}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
