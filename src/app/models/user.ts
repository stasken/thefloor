export class User {
    id?: string;
    gameId: string;
    name: string;
    color: string;
  
    constructor(gameId:string,name:string,color:string
    ) {
      this.gameId = gameId;
      this.name = name;
      this.color = color;
    }
  
  }