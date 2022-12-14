import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {HomeRoutingModule} from './home-routing.module';
import {LoginHomeComponent} from './login-home/login-home.component';


@NgModule({
    declarations: [
        LoginHomeComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        ReactiveFormsModule,
    ]
})
export class HomeModule {}
