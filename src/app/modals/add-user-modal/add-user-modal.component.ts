import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss'],
})
export class AddUserModalComponent implements OnInit {
  @Input() gameId!: string;

  inputName: string = "";
  inputColor: string = "";

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    if (!this.gameId) {
      this.modalController.dismiss("No game ID given.");
    }
  }

  addUserToList() {
    if (this.inputColor != "" && this.inputName != "") {
      let user = new User(this.gameId, this.inputName, this.inputColor);
      this.modalController.dismiss(user);
    }
  }
}
