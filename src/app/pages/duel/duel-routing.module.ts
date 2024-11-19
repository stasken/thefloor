import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DuelPage } from './duel.page';

const routes: Routes = [
  {
    path: '',
    component: DuelPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DuelPageRoutingModule {}
