import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RegisterRoutingModule} from './register-routing.module';
import {RegisterHomeComponent} from './register-home/register-home.component';
import {RegisterFormComponent} from './register-form/register-form.component';
import { InputComponent } from './input/input.component';


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
    ]
})
export class RegisterModule {}
