import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IRegisterForm, ILoginForm} from './interfaces';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private baseURL = 'http://localhost:4200/api/v1'

    constructor(private http: HttpClient) {}



    register(data: IRegisterForm) {
        return this.http.post(`${this.baseURL}/auth/signup/`, data)
    }

    login(data: ILoginForm) {
        return this.http.post(`${this.baseURL}/auth/signin/`, data)
    }
}
