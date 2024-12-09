import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CategoriesInfoModalComponent } from 'src/app/modals/categories-info-modal/categories-info-modal.component';
import { Category } from 'src/app/models/category';
import { GameCategory } from 'src/app/models/gameCategory';
import { User } from 'src/app/models/user';
import { CategoryService } from 'src/app/services/category.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-divide-categories',
  templateUrl: './divide-categories.component.html',
  styleUrls: ['./divide-categories.component.scss'],
})
export class DivideCategoriesComponent implements OnInit {
  categories: Category[] = [];
  gameCategories: GameCategory[] = [];
  users: User[] = [];
  gameId!: string;
  requiredCategoryCount = -1;
  categoriesValidated = false;

  constructor(private router: Router, private storage: StorageService, private modalController: ModalController, private catService: CategoryService, private userService: UserService) { }

  async ngOnInit() {
    await this.storage.get('gameId').then((res) => {
      if (res) {
        this.gameId = res;
        this.getUsersOfGame()
        this.getCategories();
      }
    });
  }

  getCategories() {
    let gamecats: GameCategory[] = [];
    this.catService.getAllCategories().then(cats => {
      let catss = cats;
      // let catss = cats.slice(0, 10);
      catss.forEach(cat => {
        if (cat && cat.id) {
          let gc = new GameCategory(this.gameId, 0, cat.id, cat.name, "", "", "black");
          gamecats.push(gc);
        }
      });
      this.categories = [...catss]
      this.gameCategories = [...gamecats];
      this.requiredCategoryCount = this.categories.length / this.users.length;
    })
  }

  getUsersOfGame() {
    this.userService.getAllPlayers(this.gameId).then(res => {
      this.users = [...res];
    })
  }

  updateGameCategory(e: any, cat: Category) {
    let gc = this.gameCategories.find(g => g.categoryId === cat.id);
    if (gc && e.detail.value && e.detail.value.id) {
      gc.currentUserId = e.detail.value.id;
      gc.color = e.detail.value.color;
    }
    this.validateCategories();
  }

  async checkCategoryInfoModal() {
    const modal = await this.modalController.create({
      component: CategoriesInfoModalComponent,
      componentProps: { gameCategories: this.gameCategories, users: this.users, requiredCategoryCount: this.requiredCategoryCount },
    });

    modal.onDidDismiss().then((data) => {
    });

    return await modal.present();
  }

  validateCategories() {
    const hasUnassignedCategory = this.gameCategories.some(category => category.currentUserId === '');
    if (hasUnassignedCategory) {
      this.categoriesValidated = false;
      return;
    }

    const userCategoryCounts = this.gameCategories.reduce<Record<string, number>>((counts, category) => {
      const userId = category.currentUserId;
      counts[userId] = (counts[userId] || 0) + 1;
      return counts;
    }, {});

    this.categoriesValidated = this.users.every(user => userCategoryCounts[user.id ?? "XXX"] === this.requiredCategoryCount);
  }

  async saveAllCategories() {
    await this.catService.addAllCategories(this.gameCategories);
    await this.router.navigateByUrl('/board');
  }
}
