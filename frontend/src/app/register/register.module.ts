import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RegisterRoutingModule} from './register-routing.module';
import {RegisterHomeComponent} from './register-home/register-home.component';
import {RegisterFormComponent} from './register-form/register-form.component';
import {InputComponent} from './input/input.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [
        RegisterHomeComponent,
        RegisterFormComponent,
        InputComponent,
    ],
    imports: [
        CommonModule,
        RegisterRoutingModule,
        ReactiveFormsModule,
        FontAwesomeModule,
    ]
})
export class RegisterModule {}
