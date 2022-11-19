import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IFormObj, IProfileFormData} from 'src/app/interfaces';

@Component({
    selector: 'app-prompt',
    templateUrl: './prompt.component.html',
    styleUrls: ['./prompt.component.css']
})
export class PromptComponent implements OnInit {

    @Input() prompt: IProfileFormData = {id: 0, name: '', value: '', selected: false, type: ''}
    @Output() answerEvent = new EventEmitter<IFormObj>()

    editOpen = false;
    answer = '';

    constructor() {}

    ngOnInit(): void {
    }


    setEditOpen() {
        this.editOpen = true;
    }


    setEditClose(event: Event) {

        event.stopPropagation();
        this.editOpen = false;
    }

    onInputChange(value: string) {
        this.answer = value;
    }

    onSave(event: Event) {
        event.stopPropagation();
        if (!this.answer) {
            this.editOpen = false;
            return;
        }
        this.answerEvent.emit({
            obj: this.prompt,
            answer: this.answer,
            selected: true,
        })
        this.editOpen = false;
    }
}
