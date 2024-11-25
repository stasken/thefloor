import { Injectable } from '@angular/core';
import { collection, Firestore, getDocs, orderBy, query, where } from '@angular/fire/firestore';
import { Question } from '../models/question';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  constructor(private firestore: Firestore) { }

  async getQuestionsOfCategory(categoryId:string) {
    let questions: Question[] = [];

    const userRef = collection(this.firestore, "questions")
    const q = query(
      userRef,
      where('categoryId', '==', categoryId),
      orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      let q = doc.data() as Question;
      q.id = doc.id;
      questions.push(q);
    });

    return questions;
  }

}
