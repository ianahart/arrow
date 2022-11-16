import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {faCircleUser} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '../auth.service';
import {userState} from '../data';
import {IUser} from '../interfaces';


@Component({
    selector: 'app-auth-nav-bar',
    templateUrl: './auth-nav-bar.component.html',
    styleUrls: ['./auth-nav-bar.component.css']
})
export class AuthNavBarComponent implements OnInit {

    faCircleUser = faCircleUser;
    user: IUser = userState;
    menuOpen = false;


    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.user = this.authService.getUser()
    }


    setMenuOpen(open: boolean) {
        this.menuOpen = open;
    }


    onLogout() {
        this.authService.logout().subscribe(() => {
            this.authService.setTokens(null)
            this.authService.setUser(userState)
            this.router.navigate(['/'])
        })
    }
}

