import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {basicsState} from 'src/app/data/profile';
import {IProfileFormData} from 'src/app/interfaces';
import {faChevronRight, faClose} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-basics',
    templateUrl: './basics.component.html',
    styleUrls: ['./basics.component.css']
})
export class BasicsComponent implements OnInit {
    @Output() saveBasicEvent = new EventEmitter<{id: number, value: string}>()

    @Input() basics: IProfileFormData[] = basicsState;

    faChevronRight = faChevronRight;
    selectedBasic = {id: 0, name: ''};
    basicValue = '';
    faClose = faClose;
    modalOpen = false;

    constructor() {}

    ngOnInit(): void {
    }

    openModal(id: number, name: string) {
        this.selectedBasic = {id, name}
        this.modalOpen = true;
    }

    closeModal() {
        this.modalOpen = false;
        this.basicValue = '';
    }

    cancelBasic(event: Event) {
        event.preventDefault();
        this.basicValue = '';
        this.closeModal()
    }

    onInputChange(value: string) {
        this.basicValue = value;
    }

    onSaveBasic(event: Event) {
        event.preventDefault()
        this.saveBasicEvent.emit({id: this.selectedBasic.id, value: this.basicValue})
        this.closeModal();
    }

}
