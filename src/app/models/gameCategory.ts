export class GameCategory {
    id?: string;
    gameId: string;
    categoryId: string;
    winnerId: string;
    currentUserId: string;
    finished:boolean;
    categoryName:string;
    color: string;
  
    constructor(gameId:string,categoryId:string,categoryName:string,winnerId:string,currentUserId:string,color:string
    ) {
      this.gameId = gameId;
      this.categoryId = categoryId;
      this.winnerId = winnerId;
      this.currentUserId = currentUserId;
      this.finished = false;
      this.categoryName = categoryName;
      this.color = color;
    }
  
  }