import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {IRegisterForm, IUser, IGroup, IRefreshUserResponse, ILoginForm, ITokens, ILoginResponse, ILogoutResponse, IForgotPasswordForm, IPasswordResetForm, ICreateGroupResponse} from './interfaces';
import {Observable, BehaviorSubject, tap} from 'rxjs';
import {userState, groupState} from './data';
import {catchError, of} from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private baseURL = 'http://localhost:4200/api/v1'
    private user: IUser = userState;
    private group: IGroup = groupState;
    loggedIn$ = new BehaviorSubject<boolean | null>(null);


    constructor(private http: HttpClient) {
    }



    getGroup() {
        return this.group;
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


    setGroup(group: IGroup) {
        this.group = group;
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

    forgotPasswordEmail(forgotPasswordForm: Partial<IForgotPasswordForm>) {

        return this.http.post(`${this.baseURL}/auth/forgot-password/`, {
            email: forgotPasswordForm.email,
        })
    }

    resetPassword(resetPasswordForm: IPasswordResetForm) {
        return this.http.patch(`${this.baseURL}/auth/reset-password/${resetPasswordForm.uid}/`, resetPasswordForm)
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


    createOrGetGroup(receiver: number, sender: number): Observable<ICreateGroupResponse> {
        return this.http.post<ICreateGroupResponse>(`${this.baseURL}/groups/`, {
            user_one: receiver,
            user_two: sender,
        })
    }


















}
