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


    retrieveSettings(id: number): Observable<ISetting> {
        return this.http.get<ICreateSettingsResponse>(
            `${this.baseURL}/settings/?id=${id}`).pipe(
                pluck('settings')
            )

    }

    updateSettings<T>(id: number, form: T) {
        return this.http.patch(`${this.baseURL}/settings/${id}/`, {
            form,
        })
    }
}
