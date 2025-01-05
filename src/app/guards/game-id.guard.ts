import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class GameIdGuard implements CanActivate {

  constructor(private storage: Storage, private router: Router) { }

  async canActivate(): Promise<boolean> {
    const game = await this.storage.get('game')
    if (game) {
      return true;
    } else {
      this.router.navigate(['/init']);
      return false;
    }
  }

  async canActivateBoard(): Promise<boolean> {
    const game = await this.storage.get('game')
    if (game) {
      return true;
    } else {
      this.router.navigate(['/categories']);
      return false;
    }
  }
}
