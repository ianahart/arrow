import {Component, OnInit} from '@angular/core';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
@Component({
    selector: 'app-prompts',
    templateUrl: './prompts.component.html',
    styleUrls: ['./prompts.component.css']
})
export class PromptsComponent implements OnInit {


    faPlus = faPlus
    modalOpen = false;

    constructor() {}

    ngOnInit(): void {
    }

    openModal(event: Event) {
        event.preventDefault();
        this.modalOpen = true;
    }

    closeModal() {
        this.modalOpen = false;
    }
}
