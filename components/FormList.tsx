import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Edit2 } from "lucide-react"
import { Form } from "@/types/form"

type Props = {
    form:Form
}
const FormList : React.FC<Props> = ({form}) => {
    console.log(form);

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
          <CardFooter>
            <Button variant="outline">
              <Edit2 /> Edit
            </Button>
            <Button variant="destructive">Delete</Button>
          </CardFooter>
        </Card>
      </div>
    );
}

export default FormList;
