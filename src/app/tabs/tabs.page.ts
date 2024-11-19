import { Component, OnInit } from '@angular/core';
import { GamesService } from '../services/games.service';
import { Game } from '../models/game';
import { ModalController } from '@ionic/angular';
import { Timestamp } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  constructor() {
  }
  ngOnInit() {
  }


}
