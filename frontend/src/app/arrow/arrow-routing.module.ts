import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ArrowHomeComponent} from './arrow-home/arrow-home.component';
import {AuthGuard} from '../auth.guard';
import {MatchesComponent} from './matches/matches.component';
import {MatchProfileComponent} from './match-profile/match-profile.component';
const routes: Routes = [
    {path: 'matches', component: MatchesComponent, canActivate: [AuthGuard]},
    {path: 'profile/:id', component: MatchProfileComponent, canActivate: [AuthGuard]},
    {path: '', component: ArrowHomeComponent, canActivate: [AuthGuard]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArrowRoutingModule {}
