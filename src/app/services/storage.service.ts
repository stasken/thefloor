import { Injectable } from '@angular/core';

// import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {}

  async init() {
    if (this._storage != null) {
      return;
    }
    // await this.storage.defineDriver(CordovaSQLiteDriver);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public async set(key: string, value: any): Promise<any> {
    return await this._storage?.set(key, value);
  }

  public async get(key: string): Promise<any> {
    return await this._storage?.get(key);
  }

  async clear() {
    return await this._storage?.clear();
  }
}
