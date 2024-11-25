import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BoardPage } from './board.page';

import { BoardPageRoutingModule } from './board-routing.module';
import { DivideCategoriesComponent } from 'src/app/components/game/divide-categories/divide-categories.component';
import { FloorComponent } from 'src/app/components/game/floor/floor.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    BoardPageRoutingModule
  ],
  declarations: [BoardPage, DivideCategoriesComponent,FloorComponent]
})
export class BoardPageModule {}
