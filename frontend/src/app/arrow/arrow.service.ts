import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IMatchPreviewResponse, IRetrieveProfileResponse} from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class ArrowService {
    private baseURL = 'http://localhost:4200/api/v1'
    constructor(private http: HttpClient) {}


    loadMatches(page: number): Observable<IMatchPreviewResponse> {
        return this.http.get<IMatchPreviewResponse>(`${this.baseURL}/prospects/?page=${page}`)
    }


    loadUserProfile(id: string | null): Observable<IRetrieveProfileResponse> {
        return this.http.get<IRetrieveProfileResponse>(`${this.baseURL}/strangers/${id}/`)
    }

}
