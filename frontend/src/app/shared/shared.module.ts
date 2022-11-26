import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputComponent} from './input/input.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ClickAwayMenuComponent} from './click-away-menu/click-away-menu.component';
import {ModalComponent} from './modal/modal.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';



@NgModule({
    declarations: [


        InputComponent,
        ClickAwayMenuComponent,
        ModalComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        ReactiveFormsModule,
    ],
    exports: [
        InputComponent,
        ClickAwayMenuComponent,
        ModalComponent,
    ]
})
export class SharedModule {}
