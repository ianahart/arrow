import {Injectable} from "@angular/core";
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
} from '@angular/common/http';
import {Observable} from "rxjs";
import {BehaviorSubject, filter, take, switchMap, throwError, catchError} from "rxjs";
import {AuthService} from "./auth.service";
import {userState} from "./data";

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
        let authReq = req;
        const tokens = this.authService.getTokens();
        if (tokens != null && tokens !== '') {
            authReq = this.addTokenHeader(req, tokens.access_token);
        }

        // @ts-ignore
        return next.handle(authReq).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse && !authReq.url.includes('auth/signin') && error.status === 401) {
                return this.handle401Error(authReq, next);
            }

            return throwError(error);
        }));
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            const token = this.authService.getTokens()?.refresh_token;

            if (token)
                return this.authService.refreshToken().pipe(
                    switchMap((token: any) => {
                        this.isRefreshing = false;

                        this.refreshTokenSubject.next(token.access);

                        return next.handle(this.addTokenHeader(request, token.access));
                    }),
                    catchError((err) => {
                        this.isRefreshing = false;

                        this.authService.logout();
                        this.authService.setUser(userState)
                        this.authService.setTokens(null)
                        return throwError(err);
                    })
                );
        }

        return this.refreshTokenSubject.pipe(
            filter(token => token !== null),
            take(1),
            switchMap((token) => next.handle(this.addTokenHeader(request, token)))
        );
    }

    private addTokenHeader(request: HttpRequest<any>, token: string) {
        return request.clone({headers: request.headers.set('Authorization', 'Bearer ' + token)});
    }
}




