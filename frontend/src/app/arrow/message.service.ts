import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IMessagesResponse} from '../interfaces';


@Injectable({
    providedIn: 'root'
})
export class MessageService {
    private baseURL = 'http://localhost:4200/api/v1'
    constructor(private http: HttpClient) {}


    loadMessages(sender: number, receiver: number, group: number): Observable<IMessagesResponse> {
        return this.http.get<IMessagesResponse>(`${this.baseURL}/messages/`, {
            params: {
                receiver,
                sender,
                group,
            }
        })
    }


}

