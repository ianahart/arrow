import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {IRegisterForm, IUser, IRefreshUserResponse, ILoginForm, ITokens, ILoginResponse, ILogoutResponse} from './interfaces';
import {Observable, BehaviorSubject, tap} from 'rxjs';
import {userState} from './data';
import {catchError, of} from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private baseURL = 'http://localhost:4200/api/v1'
    private user: IUser = userState;
    loggedIn$ = new BehaviorSubject<boolean | null>(null);


    constructor(private http: HttpClient) {
    }


    setTokens(tokens: ITokens | null) {
        localStorage.setItem('tokens', JSON.stringify(tokens))
    }

    getUser() {
        return this.user;
    }

    setUser(user: IUser) {
        this.user = user
    }

    getTokens() {
        if (localStorage.getItem('tokens')) {
            return JSON.parse(localStorage.getItem('tokens') || '')

        }
    }

    register(data: IRegisterForm) {
        return this.http.post(`${this.baseURL}/auth/signup/`, data)
    }

    login(data: ILoginForm): Observable<ILoginResponse> {
        return this.http.post<ILoginResponse>(`${this.baseURL}/auth/signin/`, data).pipe(
            tap(() => {
                this.loggedIn$.next(true)
            })
        )
    }

    syncUser() {
        const tokens = this.getTokens()
        return this.http.get<IRefreshUserResponse>(`${this.baseURL}/account/refresh/`,
            {headers: {'Authorization': `Bearer ${tokens?.access_token}`}}).pipe(
                tap(() => {
                    if (tokens) {
                        this.loggedIn$.next(true)
                    } else {
                        this.loggedIn$.next(false)
                    }
                })
            )
    }

    refreshToken() {
        const tokens = this.getTokens()
        return this.http
            .post<any>(`${this.baseURL}/auth/refresh/`, {
                refresh: tokens.refresh_token,
            })
            .pipe(
                tap((token) => {
                    tokens.access_token = token.access
                    this.setTokens(tokens)
                }),
                catchError((error) => {
                    this.logout()
                    return of(false);
                })
            );
    }

    logout() {
        const tokens = this.getTokens()
        return this.http.post<ILogoutResponse>(`${this.baseURL}/auth/signout/`,
            {refresh_token: tokens.refresh_token}, {
        }).pipe(
            tap(() => {
                this.loggedIn$.next(false)
            })
        )
    }


















}
