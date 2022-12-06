import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap, pluck, map} from 'rxjs';
import {ICreateSettingsResponse, ISetting} from './interfaces';


@Injectable({
    providedIn: 'root'
})
export class SettingService {
    private baseURL = 'http://localhost:4200/api/v1'

    constructor(private http: HttpClient) {

    }


    createOrRetrieveSettings(id: number): Observable<ISetting> {
        return this.http.post<ICreateSettingsResponse>(
            `${this.baseURL}/settings/`, {user: id}).pipe(
                pluck('settings')
            )

    }

    updateSettings<T>(id: number, form: T) {
        return this.http.patch(`${this.baseURL}/settings/${id}/`, {
            form,
        })
    }
}
