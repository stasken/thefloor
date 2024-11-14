import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CreateGameModalComponent } from 'src/app/modals/create-game-modal/create-game-modal.component';
import { Game } from 'src/app/models/game';
import { GamesService } from 'src/app/services/games.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-init',
  templateUrl: './init.page.html',
  styleUrls: ['./init.page.scss'],
})
export class InitPage implements OnInit {

  constructor(private mdlCtrl: ModalController, private gamesService: GamesService, private router: Router, private toaster: ToasterService, private storage: StorageService) { }

  ngOnInit() {
    this.gamesService.getAllGames().then(res => {
      console.log(res);
    })
  }

  openLoadGameModal() {

  }

  async openCreateGameModal() {
    const createGameModal = await this.mdlCtrl.create({
      component: CreateGameModalComponent,
    });

    createGameModal.onDidDismiss().then((data) => {
      let gameInputs = data.data;
      if (gameInputs) {
        this.gamesService.addGame({
          name: gameInputs.name,
          categories: gameInputs.categories,
          starttime: gameInputs.starttime,
          started: gameInputs.started,
        }).then(async res => {
          await this.storage.set("gameName", gameInputs.name);
          // await this.storage.get("gameName").then(name => {
          // })
          // const name = await this.storage.get('gameName');
          this.toaster.presentToast("Game created!", "success");
          this.router.navigate(['/thefloor/settings']);
        }, (error) => {
          this.toaster.presentToast("Error creating the game...", "danger");
        })
      }
    })

    return await createGameModal.present();
  }
}
