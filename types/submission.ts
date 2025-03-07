import { Content} from "./form";

export type Submission = {
  id: number;
  createdAt: Date; // Date can also be `Date` if parsed properly
  formId: number;
  content: Record<string, string> ; // Form responses (key-value pairs of question and answer)
  form: {
    id: number;
    ownerId: string;
    createdAt: Date;
    published: boolean;
    content:Content;
    submission: number;
    shareUrl: string;
  };
};
