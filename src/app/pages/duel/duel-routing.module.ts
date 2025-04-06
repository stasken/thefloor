import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DuelPage } from './duel.page';
import { SolutionsComponent } from 'src/app/components/game/solutions/solutions.component';

const routes: Routes = [
  {
    path: '',
    component: DuelPage,
  },
  {
    path: 'solutions/:categoryId',
    component: SolutionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DuelPageRoutingModule { }
