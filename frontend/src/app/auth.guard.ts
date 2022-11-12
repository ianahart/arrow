import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, take, tap, map, skipWhile} from 'rxjs';
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
        //@ts-ignore
        return this.authService.loggedIn$.pipe(
            skipWhile(value => value === null),
            take(1),
            map(isAuthenticated => {
                if (!isAuthenticated) {
                    this.router.navigate(['/']);
                }

                return isAuthenticated;
            })
        )


    }


}

