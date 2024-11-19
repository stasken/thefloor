import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsPage } from './settings.page';

import { SettingsPageRoutingModule } from './settings-routing.module';
import { AddUsersComponent } from '../../components/users/add-users/add-users.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SettingsPageRoutingModule
  ],
  declarations: [SettingsPage, AddUsersComponent]
})
export class SettingsPageModule {}
