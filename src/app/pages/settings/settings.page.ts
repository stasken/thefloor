import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GamesService } from 'src/app/services/games.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {
  gameId!: string;
  started: boolean = false;

  constructor(private storage: StorageService, private toaster: ToasterService, private router: Router, private gameService: GamesService) {
    this.storage.get('gameId').then(id => {
      this.gameId = id;
    })
    this.storage.get("started").then(s => {
      this.started = s;
    })
  }

  startGame() {
    // check if game is validated
    // If not tell points that aren't validated
    // If validated, go to board to divide categories
    this.gameService.startGame(this.gameId).then(() => {
      this.toaster.showToast("Game has started!", 2000, "success");
      this.storage.set('started', "true");
      this.router.navigate(['/board/categories']);
    }).catch(err => {
      this.toaster.showToast("Game couldn't start...", 2000, "danger");
      //logs
    })


  }

  logOut() {
    this.storage.set('gameId', "").then(res => {
      this.router.navigate(['/init']);
    })
  }
}
