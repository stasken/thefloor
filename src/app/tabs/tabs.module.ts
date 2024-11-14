import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { CreateGameModalComponent } from '../modals/create-game-modal/create-game-modal.component';
import { AddUserModalComponent } from '../modals/add-user-modal/add-user-modal.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage, CreateGameModalComponent, AddUserModalComponent]
})
export class TabsPageModule {}
