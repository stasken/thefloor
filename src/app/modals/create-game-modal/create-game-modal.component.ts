import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { Game } from 'src/app/models/game';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-create-game-modal',
  templateUrl: './create-game-modal.component.html',
  styleUrls: ['./create-game-modal.component.scss'],
})
export class CreateGameModalComponent implements OnInit {
  name!: string;
  categories!: number;

  constructor(private modalController: ModalController, private toaster: ToasterService) {
  }

  ngOnInit() {
  }

  addGame() {
    let startTime = Timestamp.fromDate(new Date());
    if (this.checkIfGameIsValid()) {
      let game = new Game(this.name, this.categories, startTime);
      this.modalController.dismiss(game);
    }
  }

  checkIfGameIsValid(): boolean {
    if (!this.name || this.name.trim().length < 3) {
      this.toaster.presentToast("Name should at least contain 3 characters", "warning")
      return false;
    } else if (this.categories < 10 || this.categories > 50) {
      this.toaster.presentToast("Number of categories should be between 10 and 50", "warning")
      return false;
    }
    return true;
  }

  
}
