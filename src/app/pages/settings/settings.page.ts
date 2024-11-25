import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ViewDidEnter } from '@ionic/angular';
import { AddUsersComponent } from 'src/app/components/users/add-users/add-users.component';
import { GamesService } from 'src/app/services/games.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage implements ViewDidEnter {
  gameId!: string;
  started: boolean = false;
  @ViewChild(AddUsersComponent) adduserComp!: AddUsersComponent;

  constructor(private storage: StorageService, private toaster: ToasterService, private router: Router, private gameService: GamesService) {
    this.storage.get('gameId').then(id => {
      this.gameId = id;
    })
    this.storage.get("started").then(s => {
      this.started = s;
      
    })
  }
  ionViewDidEnter(): void {
    this.storage.get('gameId').then((res) => {
      if (res) {
        this.gameId = res;
        this.adduserComp.getUsersOfGame(res);
      }
    });
  }



  startGame() {
    // check if game is validated
    // If not tell points that aren't validated
    // If validated, go to board to divide categories
    this.gameService.startGame(this.gameId).then(() => {
      this.toaster.showToast("Game has started!", 2000, "success");
      this.storage.set('started', "true");
      this.router.navigateByUrl('/board/categories',{
        replaceUrl : true
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
