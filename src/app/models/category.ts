import { Timestamp } from "@angular/fire/firestore";

export class Category {
    id?: string;
    name: string;
  
    constructor(name:string
    ) {
      this.name = name;
    }
  
  }