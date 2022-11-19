import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {promptsState} from 'src/app/data/profile';
import {IFormObj, IProfileFormData} from 'src/app/interfaces';
@Component({
    selector: 'app-prompts',
    templateUrl: './prompts.component.html',
    styleUrls: ['./prompts.component.css']
})
export class PromptsComponent implements OnInit {

    @Input() prompts: IProfileFormData[] = promptsState;
    @Output() answerEvent = new EventEmitter<IFormObj>();
    @Output() removeAnswerEvent = new EventEmitter<number>()

    faPlus = faPlus
    modalOpen = false;

    constructor() {}

    ngOnInit(): void {
    }



    onRemoveAnswer(id: number) {
        this.removeAnswerEvent.emit(id);
    }

    openModal(event: Event) {
        event.preventDefault();
        this.modalOpen = true;
    }

    closeModal() {
        this.modalOpen = false;
    }


    onAnswer(answer: IFormObj) {
        this.answerEvent.emit(answer)
    }
}
