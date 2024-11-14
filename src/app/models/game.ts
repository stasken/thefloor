import { Timestamp } from "@angular/fire/firestore";

export class Game {
    id?: string;
    name: string;
    categories: number;
    starttime: Timestamp;
    started:boolean;
  
    constructor(name:string,categories:number,startTime:Timestamp
    ) {
      this.name = name;
      this.categories = categories;
      this.starttime = startTime;
      this.started = false; 
    }
  
  }