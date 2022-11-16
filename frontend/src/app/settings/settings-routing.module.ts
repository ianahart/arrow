import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FiltersComponent} from './filters/filters.component';
import {PreferencesComponent} from './preferences/preferences.component';
import {ProfileComponent} from './profile/profile.component';
import {SettingsHomeComponent} from './settings-home/settings-home.component';
import {AuthGuard} from '../auth.guard';

const routes: Routes = [
    {
        path: '',
        component: SettingsHomeComponent,
        children: [
            {path: 'preferences', component: PreferencesComponent, canActivate: [AuthGuard]},
            {path: 'filters', component: FiltersComponent, canActivate: [AuthGuard]},
            {path: 'update-profile', component: ProfileComponent, canActivate: [AuthGuard]}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingsRoutingModule {}
