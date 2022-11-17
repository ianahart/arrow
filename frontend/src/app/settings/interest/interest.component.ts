import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {faClose} from '@fortawesome/free-solid-svg-icons';
import {ISelectedInterest} from 'src/app/interfaces';
import {interestsState} from 'src/app/data/interests';
import {IInterest} from 'src/app/interfaces';

@Component({
    selector: 'app-interest',
    templateUrl: './interest.component.html',
    styleUrls: ['./interest.component.css']
})
export class InterestComponent implements OnInit {

    @Output() selectedCreativityInterestEvent = new EventEmitter<ISelectedInterest>()
    @Input() interests: IInterest[] = interestsState

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

    selectInterest(interest: IInterest, selected: boolean, type: string) {
        const selectedInterest = {interest, selected}
        switch (type) {
            case 'creativity':
                this.selectedCreativityInterestEvent.emit(selectedInterest)
                break;
            case 'sports':
                this.selectedCreativityInterestEvent.emit(selectedInterest)
                break;
            case 'pets':
                this.selectedCreativityInterestEvent.emit(selectedInterest)
                break;

            default:

        }
    }

}
