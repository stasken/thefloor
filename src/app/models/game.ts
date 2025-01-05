import { Timestamp } from "@angular/fire/firestore";

export class Game {
    id?: string;
    name: string;
    categories: number;
    categoryPerUser: number;
    starttime: Timestamp;
    started:boolean = false;
    usersChosen: boolean = false;
  
    constructor(name:string,categories:number,startTime:Timestamp
    ) {
      this.name = name;
      this.categories = categories;
      this.categoryPerUser = categories;
      this.starttime = startTime;
    }
  
  }