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
}

