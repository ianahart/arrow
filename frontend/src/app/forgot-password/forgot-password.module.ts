import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ForgotPasswordRoutingModule} from './forgot-password-routing.module';
import {ForgotPasswordHomeComponent} from './forgot-password-home/forgot-password-home.component';
import {ResetPasswordHomeComponent} from './reset-password-home/reset-password-home.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';


@NgModule({
    declarations: [
        ForgotPasswordHomeComponent,
        ResetPasswordHomeComponent
    ],
    imports: [
        CommonModule,
        ForgotPasswordRoutingModule,
        ReactiveFormsModule,
        SharedModule,
    ]
})
export class ForgotPasswordModule {}
