import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Game } from 'src/app/models/game';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-load-game-modal',
  templateUrl: './load-game-modal.component.html',
  styleUrls: ['./load-game-modal.component.scss'],
})
export class LoadGameModalComponent  implements OnInit {
  @Input() games!: Game[];
  id: string = "";
  name: string = "";

  constructor(private modalController: ModalController, private toaster: ToasterService) { }

  ngOnInit() {}
  
  loadGameById() {
    const matchedGame = this.games.find(game => game.id === this.id);
    if (matchedGame) {
      this.modalController.dismiss(matchedGame);
    } else {
      this.toaster.showToast("Game ID not found", 2000, "warning")
    }
  }

  loadGameByName() {
    const matchedGame = this.games.find(game => game.name === this.name);
    if (matchedGame) {
      this.modalController.dismiss(matchedGame);
    } else {
      this.toaster.showToast("Game name not found", 2000, "warning")
    }
  }

  goBack() {
    this.modalController.dismiss();
  }

}
