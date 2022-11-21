import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private baseURL = 'http://localhost:4200/api/v1'

    constructor(private http: HttpClient) {}



    updateProfile(id: number, formData: any) {
        return this.http.patch(`${this.baseURL}/account/${id}/`, formData)
    }
}
