import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { GameCategory } from 'src/app/models/gameCategory';
import { User } from 'src/app/models/user';
import { CategoryService } from 'src/app/services/category.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.scss'],
})
export class FloorComponent implements OnInit {
  gameId!: string;
  gameCategories: GameCategory[] = [];
  users: User[] = [];
  currentUser!: User;
  currentPickedUser!: User | undefined;
  currentPickedCategory!: GameCategory;
  otherCategoryName!: string;

  @ViewChildren('gcElement') gcElements!: QueryList<ElementRef>;

  constructor(private storage: StorageService, private userService: UserService, private router: Router, private toaster: ToasterService,private catService: CategoryService) { }

  async ngOnInit() {
    await this.storage.get('gameId').then((res) => {
      if (res) {
        this.gameId = res;
        this.getCurrentGameCategories();
        this.getUsersOfGame();
      }
    });
  }

  getUsersOfGame() {
    this.userService.getAllPlayers(this.gameId).then(res => {
      this.users = [...res];
    })
  }

  getCurrentGameCategories() {
    this.catService.getAllGameCategories(this.gameId).then(gc => {
      const repeatedArray = Array.from({ length: 5 }, () => gc).flat();
      this.gameCategories = [...repeatedArray]
      // this.gameCategories = [...gc]
      console.log(this.gameCategories);

      if (this.gameCategories.length === 0) {
        this.router.navigate(['/board/categories']);
      }
    })
  }

  doYourThing() {
    let randomNr = Math.floor((Math.random() * 50) + 1);
    let finishedGcs = this.gameCategories.filter(gc => gc.finished).map(g => g.categoryId);
    let soleGcs = this.gameCategories.filter(gc => !gc.finished && !finishedGcs.includes(gc.id ?? ""));
    if (soleGcs.length === 0) {
      soleGcs = this.gameCategories.filter(gc => !gc.finished);
    }
    let index = randomNr % soleGcs.length;
    let id = soleGcs[index].id;
    let chosenGcIndex = this.gameCategories.findIndex(g => g.id === id);
    if (chosenGcIndex >= 0) {
      let chosenGc = this.gameCategories[chosenGcIndex];
      let chosenUser = this.users.find(u => u.id === chosenGc.currentUserId);
      let gcDiv = this.gcElements.toArray()[chosenGcIndex];
      if (gcDiv && chosenUser) {
        this.otherCategoryName = chosenGc.categoryName;
        gcDiv.nativeElement.style.transition = 'border-color 1s ease';
        gcDiv.nativeElement.style.borderColor = 'gold';
        // const onTransitionEnd = () => {
        //   gcDiv.nativeElement.style.borderColor = chosenUser?.color;
        //   gcDiv.nativeElement.removeEventListener('transitionend', onTransitionEnd);
        // };
        // gcDiv.nativeElement.addEventListener('transitionend', onTransitionEnd);

        this.currentUser = chosenUser;
      }
    }
  }

  onCategoryClick(cat: GameCategory) {
    this.currentPickedCategory = cat;
    this.currentPickedUser = this.users.find(u => u.id === cat.currentUserId);
  }

  startDuel() {
    if (!this.currentPickedUser || !this.currentPickedCategory || !this.currentUser) {
      this.toaster.showToast("You need a challenger and a category picked.", 2000, "warning")
      return;
    }
    this.storage.set("currentGc",this.currentPickedCategory);
    this.router.navigate(['/duel'], { queryParams: {
      gameId: this.gameId,
      otherCategoryName: this.otherCategoryName,
      challengerId: this.currentUser.id,
      challengedUserId: this.currentPickedUser?.id,
    } });

  }
}
