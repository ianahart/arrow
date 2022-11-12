import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ArrowService {
    private baseURL = 'http://localhost:4200/api/v1'
    constructor(private http: HttpClient) {}





    loadMatch() {
        return this.http.get(`${this.baseURL}/matches/`)
    }
}
