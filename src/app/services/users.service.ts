import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  users$: Observable<User[]> = this.usersSubject.asObservable();

  constructor() { }

  get users(): User[] {
    return this.usersSubject.value;
  }

  addUser(user: User) {
    const updatedUsers = [...this.usersSubject.value, user];
    this.usersSubject.next(updatedUsers);
  }
}
