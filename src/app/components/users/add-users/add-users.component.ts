import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AddUserModalComponent } from 'src/app/modals/add-user-modal/add-user-modal.component';
import { Game } from 'src/app/models/game';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss'],
})
export class AddUsersComponent implements OnInit {
  users: User[] = [];
  game!: Game;
  started: boolean = false;

  @Output() lengthOfUsersEmitter: EventEmitter<number> = new EventEmitter<number>();

  constructor(private modalController: ModalController, private userService: UserService, private storage: Storage) { }

  async ngOnInit() {
    await this.storage.get('game').then(async (res) => {
      if (res) {
        this.game = JSON.parse(res);
        this.started = this.game.started;
        if (this.game && this.game.id) {
          await this.getUsersOfGame(this.game.id)
        }
      }
    });
  }

  async getUsersOfGame(gameId: string) {
    this.userService.getAllPlayers(gameId).then(res => {
      this.users = [...res];
      this.lengthOfUsersEmitter.emit(this.users.length)
    })
  }

  addUser() {
    this.addUserToGameModal()
  }

  async addUserToGameModal() {
    const modal = await this.modalController.create({
      component: AddUserModalComponent,
      componentProps: { gameId: this.game.id },
    });

    modal.onDidDismiss().then((data) => {
      if (data.data && data.data instanceof User) {
        let user = data.data as User;
        this.userService.addUser({ name: user.name, color: user.color, gameId: user.gameId }).then(userRef => {
          user.id = userRef.id
          this.users.push(user);
          this.lengthOfUsersEmitter.emit(this.users.length)
        })
      } else {
      }
    });

    return await modal.present();
  }

  userDeleted(userId: string) {
    this.users = this.users.filter(user => user.id !== userId);
  }
}
