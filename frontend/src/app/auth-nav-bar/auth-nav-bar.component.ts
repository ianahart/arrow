import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {faCircleUser} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '../auth.service';
import {userState} from '../data';
@Component({
    selector: 'app-auth-nav-bar',
    templateUrl: './auth-nav-bar.component.html',
    styleUrls: ['./auth-nav-bar.component.css']
})
export class AuthNavBarComponent implements OnInit {

    faCircleUser = faCircleUser


    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
    }




    onLogout() {
        this.authService.logout().subscribe(() => {
            this.authService.setTokens(null)
            this.authService.setUser(userState)
            this.router.navigate(['/'])


        })


    }
}

