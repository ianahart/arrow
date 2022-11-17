import {Component, OnInit} from '@angular/core';
import {faClose} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-interest',
    templateUrl: './interest.component.html',
    styleUrls: ['./interest.component.css']
})
export class InterestComponent implements OnInit {

    faClose = faClose;
    modalOpen = false;
    constructor() {}

    ngOnInit(): void {
    }


    openModal() {
        this.modalOpen = true;
    }

    closeModal() {
        this.modalOpen = false;
    }
}
