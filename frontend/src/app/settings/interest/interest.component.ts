import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {faClose} from '@fortawesome/free-solid-svg-icons';
import {IFormObj, IProfileFormData} from 'src/app/interfaces';
import {interestsState} from 'src/app/data/interests';

@Component({
    selector: 'app-interest',
    templateUrl: './interest.component.html',
    styleUrls: ['./interest.component.css']
})
export class InterestComponent implements OnInit {

    @Output() selectedCreativityInterestEvent = new EventEmitter<IFormObj>()
    @Input() interests: IProfileFormData[] = interestsState;
    @Input() selectedCount = 0;

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

    selectInterest(interest: IProfileFormData, selected: boolean, type: string) {
        const selectedInterest = {obj: interest, selected}
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
