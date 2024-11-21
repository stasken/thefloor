import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { addDoc, collection, doc, Firestore, getDocs, orderBy, query, updateDoc, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  // users$: Observable<User[]> = this.usersSubject.asObservable();

  constructor(private firestore: Firestore) { }

  // get users(): User[] {
  //   return this.usersSubject.value;
  // }

  async getAllPlayers(gameId:string) {
    let users: User[] = [];

    const userRef = collection(this.firestore, "users")
    const q = query(
      userRef,
      where('gameId', '==', gameId),
      orderBy('name', 'asc'));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      let user = doc.data() as User;
      user.id = doc.id;
      users.push(user);
    });

    return users;
  }

  addUser(user: User) {
    const userRef = collection(this.firestore, "users")
    return addDoc(userRef, user)
    // const updatedUsers = [...this.usersSubject.value, user];
    // this.usersSubject.next(updatedUsers);
  }

  updateUser(userId: string,name:string,color:string) {
    const userRef = doc(this.firestore, `users/${userId}`);
    return updateDoc(userRef, {
      name: name,
      color: color,
    });
  }
}
