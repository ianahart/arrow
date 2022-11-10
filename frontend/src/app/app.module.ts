import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FooterComponent} from './footer/footer.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {HttpClientModule} from '@angular/common/http';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { AuthNavBarComponent } from './auth-nav-bar/auth-nav-bar.component';

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        NavBarComponent,
        AuthNavBarComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        FontAwesomeModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
