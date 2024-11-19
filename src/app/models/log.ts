import { Timestamp } from "@angular/fire/firestore";

export class Log {
    id?: string;
    message: string;
    where: string;
    error:boolean;
    date: Timestamp;
  
    constructor(message:string,where:string,error: boolean,date:Timestamp
    ) {
      this.message = message;
      this.where = where;
      this.date = date;
      this.error = error; 
    }
  
  }