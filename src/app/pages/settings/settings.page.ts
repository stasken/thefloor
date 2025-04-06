import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ViewDidEnter } from '@ionic/angular';
import { AddUsersComponent } from 'src/app/components/users/add-users/add-users.component';
import { Game } from 'src/app/models/game';
import { GamesService } from 'src/app/services/games.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage implements ViewDidEnter {
  game!: Game;
  started: boolean = false;
  lengthOfUsers: number = 0;
  @ViewChild(AddUsersComponent) adduserComp!: AddUsersComponent;

  constructor(private storage: StorageService, private toaster: ToasterService, private router: Router, private gameService: GamesService) {
    // this.storage.get('game').then(game => {
    //   this.game = JSON.parse(game);
    //   this.started = this.game.started;
    // })
  }
  ionViewDidEnter(): void {
    // this.storage.get('game').then((res) => {
    //   if (res) {
    //     this.game = JSON.parse(res);
    //     this.started = this.game.started;
    //     this.adduserComp.getUsersOfGame(res);
    //   }
    // });
    // console.log("Setting DID VIEW ENTER");
    this.storage.get('game').then(game => {
      console.log('game:', game);
      
      this.game = JSON.parse(game);
      this.started = this.game.started;
      this.adduserComp.getUsersOfGame(game);
    })
  }

  getLengthOfUsers(length: number){
    this.lengthOfUsers = length;
  }

  startGame() {
    // check if game is validated
    // If not tell points that aren't validated
    // If validated, go to board to divide categories$
    if (this.lengthOfUsers != 5 && this.lengthOfUsers != 25) {
      this.toaster.showToast("We need 5 of 25 players!", 2000, "warning");
      return;
    }
    if (!this.game || !this.game.id) return;
    this.gameService.startGame(this.game.id, (this.game.categories / this.lengthOfUsers)).then(() => {
      this.toaster.showToast("Game has started! Choose categories now", 2000, "success");
      this.game.started = true;
      this.started = true;
      this.storage.set('game', JSON.stringify(this.game));
      this.router.navigateByUrl(`/board/categories/${this.game.id}`, {
        replaceUrl: true
      });
    }).catch(err => {
      this.toaster.showToast("Game couldn't start...", 2000, "danger");
      //logs
    })


  }

  async logOut() {
    await this.storage.clear().then(() => {
      this.router.navigate(['/init']);
    })
  }
}
