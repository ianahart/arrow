import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth.service';
import {IUser} from './interfaces';
import {userState} from './data';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    loggedIn = false;

    constructor(private authService: AuthService) {

    }


    ngOnInit() {
        this.authService.loggedIn$.subscribe((loggedIn) => {
            console.log(loggedIn)
            this.loggedIn = loggedIn
        })
        this.authService.syncUser().subscribe((response) => {
            this.authService.setUser(response.user)
        })


    }
}
