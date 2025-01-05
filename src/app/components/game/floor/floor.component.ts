import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'src/app/models/game';
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
  game!: Game;
  gameCategories: GameCategory[] = [];
  users: User[] = [];
  currentUser!: User;
  currentPickedUser!: User | undefined;
  currentPickedCategory!: GameCategory;
  otherCategoryName!: string;
  winnerAvailable: boolean = false;

  @ViewChildren('gcElement') gcElements!: QueryList<ElementRef>;

  constructor(private route: ActivatedRoute, private storage: StorageService, private userService: UserService, private router: Router, private toaster: ToasterService, private catService: CategoryService) { }

  async ngOnInit() {
    await this.getGameFromStorage();
    if (this.users.length === 0) {
      await this.getUsersOfGame();
    }
    await this.route.queryParams.subscribe(async params => {
      this.getCurrentGameCategories();
      if (params['winner']) {
        this.winnerAvailable = true;
      }
    });
  }

  async getGameFromStorage() {
    await this.storage.get('game').then((res) => {
      this.game = JSON.parse(res);
    })
  }

  async getUsersOfGame() {
    if (!this.game) {
      await this.getGameFromStorage();
    }
    if (this.game.id) {
      this.userService.getAllPlayers(this.game.id).then(users => {
        this.users = [...users];
      })
    }
  }

  async getCurrentGameCategories() {
    if (!this.game) {
      await this.getGameFromStorage();
    }
    if (this.game.id) {
      this.catService.getAllGameCategories(this.game.id).then(gc => {
        // const repeatedArray = Array.from({ length: 5 }, () => gc).flat();
        // this.gameCategories = [...repeatedArray]
        this.gameCategories = [...gc]
        if (this.gameCategories.length === 0) {
          this.router.navigateByUrl('/board/categories');
        }
      })
    }
  }

  async doYourThing() {
    if (this.users) {
      await this.getUsersOfGame();
    }
    this.gcElements.toArray().forEach(element => {
      element.nativeElement.style.borderColor = element.nativeElement.style.backgroundColor;
    });
    let randomNr = Math.floor((Math.random() * 50) + 1);
    // Count occurrences of each categoryName
    const categoryNameCounts = this.gameCategories.reduce((counts, gc) => {
      counts[gc.categoryName] = (counts[gc.categoryName] || 0) + 1;
      return counts;
    }, {} as Record<string, number>);
    let finishedGcs = this.gameCategories.filter(gc => gc.finished).map(g => g.categoryId);
    // let soleGcs = this.gameCategories.filter(gc => !gc.finished && !finishedGcs.includes(gc.id ?? ""));
    let soleGcs = this.gameCategories.filter(gc => {
      // Include only if categoryName is unique and it’s not finished or included in finishedGcs
      return (
        categoryNameCounts[gc.categoryName] === 1 &&
        !gc.finished &&
        !finishedGcs.includes(gc.id ?? "")
      );
    });
    if (soleGcs.length === 0) {
      soleGcs = this.gameCategories.filter(gc => !gc.finished);
    }
    let index = randomNr % soleGcs.length;
    let id = soleGcs[index].id;
    console.log(index);

    this.transitionDivBorder(id ?? "");
  }

  checkWinner() {
    this.storage.get('currentChallengingGc').then(gc => {
      console.log("curr challenging GC: ");
      console.log(gc);
      this.transitionDivBorder(gc.id);
    })
    this.storage.get('currentWinnerId').then(userid => {
      this.winnerAvailable = false;
    })
  }

  transitionDivBorder(id: string) {
    let chosenGcIndex = this.gameCategories.findIndex(g => g.id === id);
    if (chosenGcIndex >= 0) {
      let chosenGc = this.gameCategories[chosenGcIndex];
      console.log("chosen Gc: ");
      console.log(chosenGc);

      let chosenGcs = this.gameCategories.filter(g => g.categoryName === chosenGc.categoryName);
      console.log("chosen GCs same field: ");
      console.log(chosenGcs);

      let chosenUser = this.users.find(u => u.id === chosenGc.currentUserId);
      console.log(chosenUser);

      if (chosenUser) {
        this.currentUser = chosenUser;
        this.storage.set("currentChallengingGc", chosenGc);
        this.storage.set("currentChallengingGcIds", chosenGcs.map(g => g.id));
        this.otherCategoryName = chosenGc.categoryName;
        chosenGcs.forEach(gc => {
          let currIndex = this.gameCategories.findIndex(g => g.id === gc.id);
          let gcDiv = this.gcElements.toArray()[currIndex];
          if (gcDiv) {
            gcDiv.nativeElement.style.transition = 'border-color 1s ease';
            gcDiv.nativeElement.style.borderColor = 'gold';
            // const onTransitionEnd = () => {
            //   gcDiv.nativeElement.style.borderColor = chosenUser?.color;
            //   gcDiv.nativeElement.removeEventListener('transitionend', onTransitionEnd);
            // };
            // gcDiv.nativeElement.addEventListener('transitionend', onTransitionEnd);

          }
        });
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
    this.storage.set("currentPickedGc", this.currentPickedCategory);
    // All tiles 
    let surroundingGcIds = this.gameCategories.filter(gc => gc.categoryName === this.currentPickedCategory.categoryName).map(g => g.id);
    this.storage.set("currentPickedGcIds", surroundingGcIds);

    this.router.navigate(['/duel'], {
      queryParams: {
        gameId: this.game.id,
        currentPickedCategory: this.currentPickedCategory,
        otherCategoryName: this.otherCategoryName,
        challengerId: this.currentUser.id,
        challengedUserId: this.currentPickedUser?.id,
      },
      replaceUrl: true
    });

  }
}
