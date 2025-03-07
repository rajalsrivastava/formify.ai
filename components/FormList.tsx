"use client"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Edit2 } from "lucide-react"
import { Form } from "@/types/form"
import { deleteForm } from "@/actions/deleteForm"
import toast from "react-hot-toast"

type Props = {
    form:Form
}
const FormList : React.FC<Props> = ({form}) => {

  const deleteFormHandler =async (formId:number)=>{
    const data = await deleteForm(formId);

    if(data.success){
      toast.success(data.message);
    }else{
      toast.error(data.message);
    }
    }
  

    return (
      <div>
        <Card>
          <CardHeader>
            <CardTitle>{form.content.formTitle}</CardTitle>
            <CardDescription>
              Deploy your new project in one-click
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href={`/dashboard/forms/${form.id}/submissions`}>
              {" "}
              <Button variant={'link'} className="text-blue-600">Submissions - {form.submission}</Button>
            </Link>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">
              <Edit2 /> Edit
            </Button>
            <Button onClick={()=>deleteFormHandler(form.id)} variant="destructive">Delete</Button>
          </CardFooter>
        </Card>
      </div>
    );
}

export default FormList;
