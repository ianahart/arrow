import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IRetrieveStrangerResponse} from './interfaces';

@Injectable({
    providedIn: 'root'
})
export class StrangerService {
    private baseURL = 'http://localhost:4200/api/v1'

    constructor(private http: HttpClient) {}


    loadStranger(): Observable<IRetrieveStrangerResponse> {
        return this.http.get<IRetrieveStrangerResponse>(`${this.baseURL}/strangers/`)
    }

    denyStranger(stranger: number): Observable<IRetrieveStrangerResponse> {
        return this.http.post<IRetrieveStrangerResponse>(`${this.baseURL}/strangers/deny/`, {
            user: stranger,
        });
    }

    acceptStranger(stranger: number) {
        return this.http.post(`${this.baseURL}/strangers/accept/`, {
            user: stranger,
        });
    }
}

