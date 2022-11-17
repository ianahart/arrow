import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {faClose} from '@fortawesome/free-solid-svg-icons';
@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

    @Output() modalEvent = new EventEmitter()

    faClose = faClose;
    constructor() {}

    ngOnInit(): void {
    }


    closeModal() {
        this.modalEvent.emit()
    }

}
