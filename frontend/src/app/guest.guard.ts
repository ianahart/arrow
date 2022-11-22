import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {skipWhile, take, map} from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class GuestGuard implements CanActivate {

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
                if (isAuthenticated) {
                    this.router.navigate(['/arrow']);
                }

                return true;
            })
        )


    }


}



