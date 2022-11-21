import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IGetProfileResponse} from './interfaces';
import {Observable} from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private baseURL = 'http://localhost:4200/api/v1'

    constructor(private http: HttpClient) {}


    getProfile(id: number): Observable<IGetProfileResponse> {
        return this.http.get<IGetProfileResponse>(`${this.baseURL}/account/${id}/`)
    }

    updateProfile(id: number, formData: any) {
        return this.http.patch(`${this.baseURL}/account/${id}/`, formData)
    }
}
