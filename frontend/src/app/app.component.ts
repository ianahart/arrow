import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth.service';
import {IUser} from './interfaces';
import {userState} from './data';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    //@ts-ignore
    loggedIn$: BehaviorSubject<boolean>;

    constructor(private authService: AuthService) {

        //@ts-ignore
        this.loggedIn$ = this.authService.loggedIn$
    }


    ngOnInit() {
        const tokens = localStorage.getItem('tokens')
        if (tokens === 'null' || tokens === null) {
            this.loggedIn$.next(false);
            return;
        }
        this.authService.syncUser().subscribe((response) => {
            this.authService.setUser(response.user)
        })


    }
}
