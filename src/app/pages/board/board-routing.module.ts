import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardPage } from './board.page';
import { DivideCategoriesComponent } from 'src/app/components/game/divide-categories/divide-categories.component';

const routes: Routes = [
  {
    path: '',
    component: BoardPage,
  },
  {
    path: 'categories/:gameId',
    component: DivideCategoriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardPageRoutingModule {}
