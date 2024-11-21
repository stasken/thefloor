import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ColorPickerModule } from 'ngx-color-picker';

import { SettingsPage } from './settings.page';
import { SettingsPageRoutingModule } from './settings-routing.module';

import { AddUsersComponent } from '../../components/users/add-users/add-users.component';
import { UserComponent } from 'src/app/components/users/user/user.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ColorPickerModule,
    SettingsPageRoutingModule,
  ],
  declarations: [SettingsPage, AddUsersComponent, UserComponent]
})
export class SettingsPageModule {}
