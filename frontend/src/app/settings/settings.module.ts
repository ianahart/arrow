import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsHomeComponent } from './settings-home/settings-home.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { FiltersComponent } from './filters/filters.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    SettingsHomeComponent,
    PreferencesComponent,
    FiltersComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
