import { Component, OnInit } from '@angular/core';
import { GamesService } from '../services/games.service';
import { Game } from '../models/game';
import { ModalController } from '@ionic/angular';
import { Timestamp } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  gameSelected = false;
  selectedGame!: Game;
  allGames: Game[] = [];

  constructor(private gamesService: GamesService, private storage: Storage) {
  }
  ngOnInit() {
    // this.testGame();
    this.getAllGames();
  }

  testGame(){
    let startTime = Timestamp.fromDate(new Date());
    let game = new Game("Test", 50, startTime);
    game.id="test";
    this.selectedGame = game;
    this.gameSelected = true;
    this.storage.set('gameId', game.id);
    console.log((this.selectedGame));
  }

  async getAllGames() {
    try {
      this.allGames = await this.gamesService.getAllGames();
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  }

  async gameAdded(game: Game) {
    this.selectedGame = game;
    this.gameSelected = true;
  }

}
