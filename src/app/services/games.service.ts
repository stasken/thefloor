import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore, getDocs, orderBy, query } from '@angular/fire/firestore';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private firestore: Firestore) {

  }

  async getAllGames(): Promise<Game[]> {
    let gameArray: Game[] = [];

    const GamesRef = collection(this.firestore, 'games');
    const q = query(GamesRef);
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      let game = doc.data() as Game;
      game.id = doc.id;
      gameArray.push(game);
    });

    return gameArray;
  }

  addGame(game: Game) {
    const gameRef = collection(this.firestore, "games")
    return addDoc(gameRef, game)
  }
}
