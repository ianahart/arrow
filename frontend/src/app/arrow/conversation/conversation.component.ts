import {Component, OnChanges, OnInit, Input, SimpleChanges} from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-conversation',
    templateUrl: './conversation.component.html',
    styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

    @Input() curConversation = 0;

    messageForm = new FormGroup({
        message: new FormControl('', [Validators.required])
    })


    constructor() {}

    ngOnInit(): void {
    }


    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes)
        if (this.curConversation === 0) return;
        console.log('fetching messages', this.curConversation)
    }

    onSubmit(event: Event) {
        event.preventDefault();
        if (this.messageForm.invalid) return;
        console.log(this.messageForm.value)
    }
}
