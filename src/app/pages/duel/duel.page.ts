import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { GameCategory } from 'src/app/models/gameCategory';
import { Question } from 'src/app/models/question';
import { User } from 'src/app/models/user';
import { AudioService } from 'src/app/services/audio.service';
import { CategoryService } from 'src/app/services/category.service';
import { QuestionsService } from 'src/app/services/questions.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-duel',
  templateUrl: 'duel.page.html',
  styleUrls: ['duel.page.scss']
})
export class DuelPage implements OnInit, OnDestroy {
  gameId!: string;
  gameCategory!: GameCategory;
  challengingGameCategory!: GameCategory;
  otherCategoryName!: string;
  challengedUser!: User;
  challenger!: User;

  currentChallengingGcIds!: string[];
  currentPickedGcIds!: string[];

  questions: Question[] = [];
  currentQuestion!: Question | null;
  currentQuestionIndex: number = 0;

  timerSubscription: Subscription | null = null; // To manage the timer
  challengerTime: number = 3000;
  challengedUserTime: number = 3000;
  userPassed = false;

  currentPlayer: 'challenger' | 'challengedUser' = 'challenger';

  isFinished: boolean = false;
  winnerName: string = "";
  winner!: User;

  isAudioRound = false;

  constructor(private route: ActivatedRoute, private router: Router, private audio: AudioService, private storage: StorageService, private questionService: QuestionsService, private gcService: CategoryService, private userService: UserService) { }

  ngOnInit(): void {
    console.log('ngOnInit called');

    this.route.queryParams.subscribe(async params => {
      this.gameId = params['gameId'];
      this.otherCategoryName = params['otherCategoryName'];
      let challengerId = params['challengerId']
      let challengedUserId = params['challengedUserId']
      await this.getAllData(challengerId, challengedUserId);
    });
  }

  @HostListener('unloaded')
  ngOnDestroy() {
    console.log('ngOnDestroy called');

    this.questions = [];
    this.currentQuestion = null;
    this.currentQuestionIndex = 0;
    this.timerSubscription = null; // To manage the timer
    this.challengerTime = 3000;
    this.challengedUserTime = 3000;
    this.isFinished = false;
    this.winnerName = "";
  }

  async getAllData(cid: string, cuid: string) {
    await this.storage.get("currentPickedGc").then(gc => {
      let currGc = gc as GameCategory;
      this.gameCategory = currGc;
    })
    await this.storage.get("currentChallengingGc").then(gc => {
      let currChallengingGc = gc as GameCategory;
      this.challengingGameCategory = currChallengingGc;
    })
    await this.storage.get("currentChallengingGcIds").then(gcIds => {
      this.currentChallengingGcIds = gcIds;
    })
    await this.storage.get("currentPickedGcIds").then(gcIds => {
      this.currentPickedGcIds = gcIds;
    })
    this.getQuestions();
    this.getUsers(cid, cuid);
  }

  getQuestions() {
    // CiW0bBFO9DwPBISnCF2z Wiskunde
    // bvvQVpqwcG20lPgkjVz6 Movies
    // 1ghVcJETp1OSac8DPA7J Vlaggen
    // this.questionService.getQuestionsOfCategory(this.categoryId).then(qs => {
    this.questionService.getQuestionsOfCategory("CiW0bBFO9DwPBISnCF2z").then(qs => {
      this.questions = [...qs]
      if (this.questions[0].isList && this.questions[0].isPicture) {
        this.isAudioRound = true;
        this.getAllAudios();
      }
    })
  }
  

  getAllAudios() {
    let path = '../assets/questions/';
    this.questions.forEach(q => {
      let fullPath = `${path}${q.path}.mp3`
      this.audio.preload(q.answer, fullPath);
    })
  }

  getUsers(cid: string, cuid: string) {
    this.userService.getAllPlayers(this.gameId).then(users => {
      users.forEach(user => {
        if (user.id === cid) {
          this.challenger = user;
        } else if (user.id === cuid) {
          this.challengedUser = user;
        }
      });
    })
  }

  initDuel() {
    this.currentQuestion = this.questions[this.currentQuestionIndex];
    if (this.isAudioRound) {
      this.audio.play(this.currentQuestion.answer);
    }
    this.startTimer(this.currentPlayer);
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex === this.questions.length) {
      this.currentQuestionIndex = 0;
    }
    this.currentQuestion = this.questions[this.currentQuestionIndex];
    if (this.isAudioRound) {
      this.audio.play(this.currentQuestion.answer);
    }
  }

  correctAnswerGiven() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe(); // Stop current timer
    }
    this.currentPlayer = this.currentPlayer === 'challenger' ? 'challengedUser' : 'challenger';

    this.nextQuestion();

    this.startTimer(this.currentPlayer);
  }

  pass() {
    this.userPassed = true;
    setTimeout(() => {
      this.nextQuestion();
      this.userPassed = false;
    }, 3000);
  }

  startTimer(player: 'challenger' | 'challengedUser'): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe(); // Stop any existing timer
    }

    const timer$ = interval(10); // Emits every 1 second

    this.timerSubscription = timer$.subscribe(() => {
      if (player === 'challenger') {
        this.challengerTime--;
        if (this.challengerTime === 0) {
          this.timerSubscription?.unsubscribe();
          this.duelFinished(false);
        }
      } else {
        this.challengedUserTime--;
        if (this.challengedUserTime === 0) {
          this.timerSubscription?.unsubscribe();
          this.duelFinished(true);
        }
      }
    });
  }

  getDisplayTime(time: number): string {
    if (time >= 500) {
      // Toon alleen de seconden
      return Math.floor(time / 100).toString();
    } else {
      // Toon seconden met tienden
      return (time / 100).toFixed(1); // Toont 4.9, 3.2, enz.
    }
  }

  async duelFinished(challengerWon: boolean) {
    if (challengerWon) {
      this.winnerName = this.challenger.name
      this.winner = this.challenger;
    } else {
      this.winnerName = this.challengedUser.name
      this.winner = this.challengedUser;
    }
    console.log("Winner: ");
    console.log(this.winner);
    console.log(this.winnerName);

    let allGcs = this.currentPickedGcIds.concat(this.currentChallengingGcIds);
    allGcs.forEach(async gcId => {
      await this.gcService.updateGameCategoryById(gcId, this.winner.id ?? "", this.otherCategoryName, this.winner.color)
    });

    this.isFinished = true;
    this.gameCategory.finished = true;
    this.gameCategory.winnerId = this.winner.id ?? "";
    this.gameCategory.currentUserId = this.winner.id ?? "";
    this.gameCategory.categoryName = this.otherCategoryName;
    this.gameCategory.color = this.winner.color;
    await this.gcService.updateGameCategory(this.gameCategory).then(res => {
      this.storage.set("currentWinnerId", this.winner.id);
    })

  }

  async finishDuel() {
    if (this.challengingGameCategory.currentUserId != this.winner.id) {
      this.challengingGameCategory.currentUserId = this.winner.id ?? "";
      this.challengingGameCategory.color = this.winner.color;
      await this.gcService.updateGameCategory(this.challengingGameCategory).then(res => {
        this.router.navigate(['/board'], {
          queryParams: {
            winner: true,
          },
          replaceUrl: true
        });
      })
    } else {
      this.router.navigate(['/board'], {
        queryParams: {
          winner: true,
        },
        replaceUrl: true
      });
    }
  }

}
