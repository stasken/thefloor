import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AddUserModalComponent } from 'src/app/modals/add-user-modal/add-user-modal.component';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss'],
})
export class AddUsersComponent  implements OnInit {
  @Input() started: boolean = false;
  users: User[] = [];
  gameId!: string;

  constructor(private modalController: ModalController, private userService: UserService, private storage: Storage) { }

  async ngOnInit() {
    await this.storage.get('gameId').then((res) => {
      if (res) {
        this.gameId = res;
        this.getUsersOfGame()
      }
    });
  }

  getUsersOfGame() {
    this.userService.getAllPlayers(this.gameId).then(res => {
      this.users = [...res];
    })
  }

  addUser() {
    this.addUserToGameModal()
  }

  async addUserToGameModal() {
    const modal = await this.modalController.create({
      component: AddUserModalComponent,
      componentProps: { gameId: this.gameId },
    });

    modal.onDidDismiss().then((data) => {
      if (data.data && data.data instanceof User) {
        let user = data.data as User;
        this.userService.addUser({name:user.name,color:user.color,gameId:user.gameId}).then(userRef => {
          user.id = userRef.id
          this.users.push(user);
        })
      } else {
      }
    });

    return await modal.present();
  }
}
