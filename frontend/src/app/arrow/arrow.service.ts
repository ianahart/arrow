import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IMatchPreviewResponse} from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class ArrowService {
    private baseURL = 'http://localhost:4200/api/v1'
    constructor(private http: HttpClient) {}





    loadMatches(): Observable<IMatchPreviewResponse> {
        return this.http.get<IMatchPreviewResponse>(`${this.baseURL}/prospects/`)
    }
}
