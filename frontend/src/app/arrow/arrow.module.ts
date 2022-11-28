import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ArrowRoutingModule} from './arrow-routing.module';
import {ArrowHomeComponent} from './arrow-home/arrow-home.component';
import {StrangerComponent} from './stranger/stranger.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AgePipe} from '../pipes/age';
import {SharedModule} from '../shared/shared.module';
import { MatchesComponent } from './matches/matches.component';
import { ProfileComponent } from './profile/profile.component';
import { MatchProfileComponent } from './match-profile/match-profile.component';

@NgModule({
    declarations: [
        ArrowHomeComponent,
        StrangerComponent,
        AgePipe,
        MatchesComponent,
        ProfileComponent,
        MatchProfileComponent
    ],
    imports: [
        CommonModule,
        ArrowRoutingModule,
        FontAwesomeModule,
        SharedModule,
    ]
})
export class ArrowModule {}
