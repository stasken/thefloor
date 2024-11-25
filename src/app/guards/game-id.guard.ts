import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class GameIdGuard implements CanActivate {

  constructor(private storage: Storage, private router: Router) { }

  async canActivate(): Promise<boolean> {
    const gameId = await this.storage.get('gameId')
    if (gameId) {
      return true;
    } else {
      this.router.navigate(['/init']);
      return false;
    }
  }
}
