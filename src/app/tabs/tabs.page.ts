import { Component, OnInit } from '@angular/core';
import { GamesService } from '../services/games.service';
import { Game } from '../models/game';
import { ModalController } from '@ionic/angular';
import { Timestamp } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  constructor(private router: Router) {
  }
  ngOnInit() {
  }

  navigateToSettings(){
    this.router.navigateByUrl('/settings',{
      replaceUrl : true
     });
  }
  navigateToBoard() {
    console.log("lol");
    
    this.router.navigate(['/board'],{
      replaceUrl : true,
      queryParams: {}
     });
  }
}
