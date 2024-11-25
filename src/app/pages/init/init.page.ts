import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CreateGameModalComponent } from 'src/app/modals/create-game-modal/create-game-modal.component';
import { LoadGameModalComponent } from 'src/app/modals/load-game-modal/load-game-modal.component';
import { Game } from 'src/app/models/game';
import { GamesService } from 'src/app/services/games.service';
import { LogsService } from 'src/app/services/logs.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-init',
  templateUrl: './init.page.html',
  styleUrls: ['./init.page.scss'],
})
export class InitPage implements OnInit {
  allGames: Game[] = [];
  currentGame!: Game;

  constructor(
    private mdlCtrl: ModalController,
    private gamesService: GamesService,
    private logsService: LogsService,
    private router: Router,
    private toaster: ToasterService,
    private storage: StorageService
  ) { }

  async ngOnInit() {
    this.gamesService.getAllGames().then(games => {
      this.allGames = [...games];
      this.storage.get('gameId').then(id => {
        const matchedGame = this.allGames.find(game => game.id === id);
        if (matchedGame) {
          this.currentGame = matchedGame;
          this.router.navigateByUrl('/settings');
        }
      })
    })
  }

  async openLoadGameModal() {
    const openGameModal = await this.mdlCtrl.create({
      component: LoadGameModalComponent,
      componentProps: { games: this.allGames },
    });

    // 8wT5C0UGjFRnzU56OLOs
    openGameModal.onDidDismiss().then((data) => {
      let gameInputs = data.data;
      if (gameInputs) {
        this.storage.set("gameId", gameInputs.id);
        this.storage.set("started", gameInputs.started);
        this.toaster.showToast("Game loaded!", 2000, "success");
        this.router.navigateByUrl('/settings');
      }
    })

    return await openGameModal.present();
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
          await this.storage.set("gameId", res.id);
          this.toaster.showToast("Game created!", 2000, "success");
          this.router.navigateByUrl('/settings');
        }, (error) => {
          this.toaster.showToast("Error creating the game...", 2000, "danger");
          let msg;
          if (error.message) { msg = error.message; } else { msg = error; }
          let startTime = Timestamp.fromDate(new Date());
          this.logsService.addLog({ message: msg, where: "Create Game Modal -- add game", error: true, date: startTime })
        })
      }
    })

    return await createGameModal.present();
  }
}
