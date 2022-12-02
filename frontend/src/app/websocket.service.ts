import {Injectable} from "@angular/core";
import {Observable, Observer} from 'rxjs';
import {AnonymousSubject} from 'rxjs/internal/Subject';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthService} from "./auth.service";
import {IMessage} from "./interfaces";


@Injectable()
export class WebsocketService {
    // @ts-ignore
    private subject: AnonymousSubject<MessageEvent>;
    public messages: Subject<IMessage>;

    constructor(private authService: AuthService) {
        const userId = this.authService.getUser()?.id;
        const token = this.authService.getTokens()?.access_token
        const MESSAGE_URL = `ws://localhost:8000/ws/message/${userId}/?token=${token}`

        this.messages = <Subject<IMessage>>this.connect(MESSAGE_URL).pipe(
            map(
                (response: MessageEvent): IMessage => {
                    let data = JSON.parse(response.data)
                    console.log(data)
                    return data;
                }
            )
        );
    }

    public connect(url: string): AnonymousSubject<MessageEvent> {
        if (!this.subject) {
            this.subject = this.create(url);
            console.log("Successfully connected: " + url);
        }
        return this.subject;
    }

    private create(url: string): AnonymousSubject<MessageEvent> {
        let ws = new WebSocket(url);
        let observable = new Observable((obs: Observer<MessageEvent>) => {
            ws.onmessage = obs.next.bind(obs);
            ws.onerror = obs.error.bind(obs);
            ws.onclose = obs.complete.bind(obs);
            return ws.close.bind(ws);
        });
        let observer = {
            error: (err: any) => {
                console.log(err)
            },
            complete: () => {
                console.log('complete')
            },
            next: (data: Object) => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify(data));
                }
            }
        };
        return new AnonymousSubject<MessageEvent>(observer, observable);
    }
}

