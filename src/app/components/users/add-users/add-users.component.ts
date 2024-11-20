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
  users: User[] = [];
  gameId!: string;

  constructor(private modalController: ModalController, private userService: UserService, private storage: Storage) { }

  async ngOnInit() {
    this.testUsers();
    await this.storage.get('gameId').then((res) => {
      if (res) {
        this.gameId = res;
        console.log(res);
        
      }
    });
  }

  testUsers() {
    let user1 = new User("test","Arno","blue")
    let user2 = new User("test","Lud","green")
    let user3 = new User("test","Thomas","yellow")
    let user4 = new User("test","Mel","red")
    let user5 = new User("test","Elias","purple")

    this.users.push(user1,user2,user3,user4,user5)
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
        this.userService.addUser(user);
      } else {
      }
    });

    return await modal.present();
  }
}
