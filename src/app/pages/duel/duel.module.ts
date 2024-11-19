import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DuelPage } from './duel.page';

import { DuelPageRoutingModule } from './duel-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    DuelPageRoutingModule
  ],
  declarations: [DuelPage]
})
export class DuelPageModule {}
