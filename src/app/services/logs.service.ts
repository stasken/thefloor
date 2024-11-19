import { Injectable } from '@angular/core';
import { collection, addDoc, Firestore } from '@angular/fire/firestore';
import { Log } from '../models/log';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  constructor(private firestore: Firestore) {}

  addLog(log: Log) {
    const logRef = collection(this.firestore, "logs")
    return addDoc(logRef, log)
  }
}
