import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {

  constructor(private storage: StorageService, private router: Router) {}

  logOut() {
    this.storage.set('gameId',"").then(res => {
      this.router.navigate(['/init']);
    })
  }
}
