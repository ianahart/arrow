import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService) {}
    loggedIn = false;
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        this.authService.loggedIn$.subscribe((loggedIn) => {
            this.loggedIn = loggedIn
        })


        if (!this.loggedIn) {
            this.router.navigate(['/'])
        }
        return this.loggedIn

    }


}
