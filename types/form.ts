export type Form = {
    id:number;
    ownerId:string;
    published:boolean;
    content:{
        formTitle:string;
        formFields:object[];
    };
    submission:number;
    shareUrl:string;
}
