import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputComponent} from './input/input.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ClickAwayMenuComponent} from './click-away-menu/click-away-menu.component';



@NgModule({
    declarations: [


        InputComponent,
        ClickAwayMenuComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    exports: [
        InputComponent,
        ClickAwayMenuComponent,
    ]
})
export class SharedModule {}
