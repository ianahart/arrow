import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArrowRoutingModule } from './arrow-routing.module';
import { ArrowHomeComponent } from './arrow-home/arrow-home.component';


@NgModule({
  declarations: [
    ArrowHomeComponent
  ],
  imports: [
    CommonModule,
    ArrowRoutingModule
  ]
})
export class ArrowModule { }
