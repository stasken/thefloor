import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore, getDocs, query, firestoreInstance$, where, doc, updateDoc, orderBy } from '@angular/fire/firestore';
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
    const q = query(categoriesRef,
      orderBy('name', 'asc'));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      let category = doc.data() as Category;
      category.id = doc.id;
      categoryArray.push(category);
    });

    return categoryArray;
  }

  async getAllGameCategories(gameId: string) {
    let categoryArray: GameCategory[] = [];

    const categoriesRef = collection(this.firestore, 'gameCategories');
    const q = query(categoriesRef,
      where('gameId', '==', gameId),
      orderBy('index', 'asc')
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

  addAllCategories(gameCategories: GameCategory[]) {
    const optimizedGrid: GameCategory[] = this.optimizeGrid(gameCategories);
    optimizedGrid.forEach(async (gc,i) => {
      await this.addGameCategory({
        gameId: gc.gameId,
        index: i,
        categoryId: gc.categoryId,
        winnerId: gc.winnerId,
        currentUserId: gc.currentUserId,
        categoryName: gc.categoryName,
        finished: false,
        color: gc.color
      })
    })
  }

  async updateGameCategory(gc: GameCategory) {
    const gcRef = doc(this.firestore, `gameCategories/${gc.id}`);
    return updateDoc(gcRef, {
      winnerId: gc.winnerId,
      currentUserId: gc.currentUserId,
      finished: gc.finished,
      categoryName: gc.categoryName,
      color: gc.color
    });
  }

  async updateGameCategoryById(gcId: string, currentUserId: string, categoryName: string, color: string) {
    const gcRef = doc(this.firestore, `gameCategories/${gcId}`);
    return updateDoc(gcRef, {
      currentUserId: currentUserId,
      categoryName: categoryName,
      color: color
    });
  }


  // async updateGameCategoryIndex(gc: GameCategory,i: number) {
  //   const gcRef = doc(this.firestore, `gameCategories/${gc.id}`);
  //   return updateDoc(gcRef, {
  //     index: i
  //   });
  // }
  // updateGrid(categories: GameCategory[]) {
  //   categories.forEach(async (gc,i) => {
  //     await this.updateGameCategoryIndex(gc,i)
  //   })
  // }

  optimizeGrid(categories: GameCategory[]): GameCategory[] {
    const GRID_SIZE = 5; // 5x5 grid
    const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;

    // Helper: Calculate coordinates from index
    const getCoordinates = (index: number) => ({
      row: Math.floor(index / GRID_SIZE),
      col: index % GRID_SIZE,
    });

    // Helper: Calculate index from coordinates
    const getIndex = (row: number, col: number) => row * GRID_SIZE + col;

    // Helper: Get adjacent indices
    const getAdjacentIndices = (index: number) => {
      const { row, col } = getCoordinates(index);
      const adjacent = [];
      if (row > 0) adjacent.push(getIndex(row - 1, col)); // top
      if (row < GRID_SIZE - 1) adjacent.push(getIndex(row + 1, col)); // bottom
      if (col > 0) adjacent.push(getIndex(row, col - 1)); // left
      if (col < GRID_SIZE - 1) adjacent.push(getIndex(row, col + 1)); // right
      return adjacent;
    };

    // Helper: Calculate the conflict score of a grid
    const calculateConflicts = (grid: GameCategory[]) => {
      let conflicts = 0;
      grid.forEach((category, index) => {
        const adjacentIndices = getAdjacentIndices(index);
        adjacentIndices.forEach(adjIndex => {
          if (grid[adjIndex] && grid[adjIndex].currentUserId === category.currentUserId) {
            conflicts++;
          }
        });
      });
      return conflicts;
    };

    // Helper: Swap two elements in the grid
    const swap = (grid: GameCategory[], i: number, j: number) => {
      [grid[i], grid[j]] = [grid[j], grid[i]];
    };

    // Step 1: Generate an initial random grid
    const shuffledIndices = Array.from({ length: TOTAL_CELLS }, (_, i) => i);
    for (let i = shuffledIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledIndices[i], shuffledIndices[j]] = [shuffledIndices[j], shuffledIndices[i]];
    }
    const grid = Array(TOTAL_CELLS).fill(null);
    shuffledIndices.forEach((index, i) => {
      grid[index] = categories[i];
    });

    // Step 2: Optimize the grid
    let bestGrid = [...grid];
    let bestScore = calculateConflicts(grid);

    const iterations = 500; // Number of iterations for refinement
    for (let k = 0; k < iterations; k++) {
      const i = Math.floor(Math.random() * TOTAL_CELLS);
      const j = Math.floor(Math.random() * TOTAL_CELLS);
      if (i !== j) {
        // Swap two random cells
        swap(grid, i, j);

        // Calculate the new score
        const newScore = calculateConflicts(grid);

        // Keep the swap if it improves the grid
        if (newScore < bestScore) {
          bestGrid = [...grid];
          bestScore = newScore;
        } else {
          // Revert the swap if no improvement
          swap(grid, i, j);
        }
      }
    }
    return bestGrid;
  }

}
