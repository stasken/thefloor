import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GameCategory } from 'src/app/models/gameCategory';
import { User } from 'src/app/models/user';

export class UserCount {
  name: string;
  count: number;

  constructor(name:string, count:number
  ) {
    this.name = name;
    this.count = count;
  }

}

@Component({
  selector: 'app-categories-info-modal',
  templateUrl: './categories-info-modal.component.html',
  styleUrls: ['./categories-info-modal.component.scss'],
})
export class CategoriesInfoModalComponent  implements OnInit {
  @Input() gameCategories: GameCategory[] = [];
  @Input() users: User[] = [];
  @Input() requiredCategoryCount: number = 0;
  
  userCounts: UserCount[] = [];

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.countHowManyCatsPerUser();
  }

  countHowManyCatsPerUser() {
    this.users.forEach(u => {
      let c = this.gameCategories.filter(c => c.currentUserId === u.id).length;      
      let uc = new UserCount(u.name,c);
      if (c < this.requiredCategoryCount) {
        this.userCounts.unshift(uc)
      } else {
        this.userCounts.push(uc)
      }
    })
  }
  goBack() {
    this.modalController.dismiss();
  }
}
