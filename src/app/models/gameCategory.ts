export class GameCategory {
    id?: string;
    index: number;
    gameId: string;
    categoryId: string;
    winnerId: string;
    currentUserId: string;
    finished:boolean;
    categoryName:string;
    color: string;
  
    constructor(gameId:string,index:number,categoryId:string,categoryName:string,winnerId:string,currentUserId:string,color:string
    ) {
      this.gameId = gameId;
      this.index = index;
      this.categoryId = categoryId;
      this.winnerId = winnerId;
      this.currentUserId = currentUserId;
      this.finished = false;
      this.categoryName = categoryName;
      this.color = color;
    }
  
  }