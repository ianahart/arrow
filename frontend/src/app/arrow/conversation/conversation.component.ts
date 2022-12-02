import {Component, OnChanges, OnInit, Input, SimpleChanges} from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {AuthService} from 'src/app/auth.service';
import {WebsocketService} from 'src/app/websocket.service';
import {MessageService} from '../message.service';
import {IMessage} from 'src/app/interfaces';
import {userState} from 'src/app/data';

@Component({
    selector: 'app-conversation',
    templateUrl: './conversation.component.html',
    styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

    @Input() curConversation = 0;
    currentUserId = 0;
    messages: IMessage[] = []

    messageForm = new FormGroup({
        message: new FormControl('', [Validators.required])
    })


    constructor(
        private websocketService: WebsocketService,
        private authService: AuthService,
        private messageService: MessageService,
    ) {


        this.websocketService.messages.subscribe(msg => {
            console.log("Response from websocket: " + msg);
            //  @ts-ignore
            this.messages = [msg.message, ...this.messages]
            console.log(this.messages)
        });

    }

    ngOnInit(): void {
        this.currentUserId = this.authService.getUser()?.id

    }


    ngOnChanges(changes: SimpleChanges): void {
        if (this.curConversation === 0) return;

        const sender = this.authService.getUser()?.id
        this.authService.createOrGetGroup(this.curConversation, sender).subscribe((response) => {
            this.authService.setGroup(response.group)


            this.messageService.loadMessages(sender, this.curConversation, this.authService.getGroup().id
            ).subscribe((response) => {
                this.messages = response.messages;
            })

        })





    }

    onSubmit(event: Event) {
        event.preventDefault();
        if (this.messageForm.invalid) return;
        //        let message = {
        //            receiver: this.curConversation,
        //            group: this.authService.getGroup()?.id,
        //            sender: this.authService.getUser()?.id,
        //            text: '',
        //        };



        let message = {
            id: 0,
            receiver: {first_name: '', last_name: '', id: this.curConversation},
            group: this.authService.getGroup()?.id,
            sender: {first_name: '', last_name: '', id: this.authService.getUser()?.id},
            text: '',
        };




        if (this.messageForm.value.message) {
            message.text = this.messageForm.value.message;
        }

        this.websocketService.messages.next(message);
        this.messageForm.reset()
    }
}
