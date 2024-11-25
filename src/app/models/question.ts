export class Question {
    id?: string;
    categoryId: string;
    question: string;
    answer: string;
    path: string;
    order: number;
    isList:boolean;
    isPicture:boolean;
  
    constructor(categoryId:string,question:string,answer:string,path:string,order:number,isPicture:boolean,isList:boolean
    ) {
      this.categoryId = categoryId;
      this.question = question;
      this.answer = answer;
      this.path = path;
      this.isList = isList;
      this.isPicture = isPicture;
      this.order = order;
    }
  
  }