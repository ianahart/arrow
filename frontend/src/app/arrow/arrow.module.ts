import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ArrowRoutingModule} from './arrow-routing.module';
import {ArrowHomeComponent} from './arrow-home/arrow-home.component';
import {StrangerComponent} from './stranger/stranger.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AgePipe} from '../pipes/age';

@NgModule({
    declarations: [
        ArrowHomeComponent,
        StrangerComponent,
        AgePipe
    ],
    imports: [
        CommonModule,
        ArrowRoutingModule,
        FontAwesomeModule,
    ]
})
export class ArrowModule {}
