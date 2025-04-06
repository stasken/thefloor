import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, orderBy, query, where } from '@angular/fire/firestore';
import { Question } from '../models/question';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  constructor(private firestore: Firestore) { }


  async getQuestionsOfCategory(categoryId: string) {
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

  async addQuestion(question: Question) {
    const questionRef = collection(this.firestore, "questions")
    return addDoc(questionRef, question)
  }

  addAllQuestions(questions: Question[]) {
    questions.forEach(async gc => {
      await this.addQuestion({
        categoryId: gc.categoryId,
        question: gc.question,
        answer: gc.answer,
        path: gc.path,
        order: gc.order,
        isList: gc.isList,
        isPicture: gc.isPicture
      })
    })
  }

  async deleteQ(question: Question) {
    const gcRef = doc(this.firestore, `questions/${question.id}`);
    return await deleteDoc(gcRef);
  }

  async getDistinctCategoryIds(): Promise<string[]> {
    const questionsRef = collection(this.firestore, "questions");
    const querySnapshot = await getDocs(questionsRef);
  
    const categoryIds = new Set<string>();
  
    querySnapshot.forEach((doc) => {
      let data = doc.data() as Question;
      if (data.categoryId) {
        categoryIds.add(data.categoryId);
      }
    });
  
    return Array.from(categoryIds);
  }
  
}
