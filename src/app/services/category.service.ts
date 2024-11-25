import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore, getDocs, query, firestoreInstance$, where, doc, updateDoc } from '@angular/fire/firestore';
import { Category } from '../models/category';
import { GameCategory } from '../models/gameCategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private firestore: Firestore) { }

  async getAllCategories() {
    let categoryArray: Category[] = [];

    const categoriesRef = collection(this.firestore, 'categories');
    const q = query(categoriesRef);
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      let category = doc.data() as Category;
      category.id = doc.id;
      categoryArray.push(category);
    });

    return categoryArray;
  }

  async getAllGameCategories(gameId:string) {
    let categoryArray: GameCategory[] = [];

    const categoriesRef = collection(this.firestore, 'gameCategories');
    const q = query(categoriesRef,
      where('gameId', '==', gameId),
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      let category = doc.data() as GameCategory;
      category.id = doc.id;
      categoryArray.push(category);
    });

    return categoryArray;
  }



  async addCategory(category: Category) {
    const categoryRef = collection(this.firestore, "categories")
    return addDoc(categoryRef, category)
  }

  async addGameCategory(gameCategory: GameCategory) {
    const gameCategoryRef = collection(this.firestore, "gameCategories")
    return addDoc(gameCategoryRef, gameCategory)
  }

  addAllCategories(gameCategories:GameCategory[]) {
    gameCategories.forEach(async gc => {
      await this.addGameCategory({
        gameId: gc.gameId,
        categoryId: gc.categoryId,
        winnerId: gc.winnerId,
        currentUserId: gc.currentUserId,
        categoryName: gc.categoryName,
        finished: false,
        color:gc.color
      })
    })
  }

  updateGameCategory(gc: GameCategory){
    const gcRef = doc(this.firestore, `gameCategories/${gc.id}`);
    return updateDoc(gcRef, {
      winnerId: gc.winnerId,
      currentUserId: gc.currentUserId,
      finished: true,
      categoryName: gc.categoryName,
      color: gc.color
    });
  }
}
