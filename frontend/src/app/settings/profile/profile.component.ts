import {Component, OnInit} from '@angular/core';
import {ICreativityInterest, IInterest, ISelectedInterest} from 'src/app/interfaces';
import {interestsState} from 'src/app/data/interests';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


    interests: IInterest[] = interestsState;

    constructor() {}

    ngOnInit(): void {
    }



    private updateSelected(list: IInterest[], selectedItem: ISelectedInterest) {
        return list.map((item) => {
            if (item.id === selectedItem.interest.id) {
                item.selected = selectedItem.selected
            }
        })
    }

    private getInterests() {
        return this.interests.filter((interest) => interest.selected)
    }


    selectCreativityInterest(selectedInterest: ISelectedInterest) {
        if (this.getInterests().length === 5) {
            return;
        }
        this.updateSelected(this.interests, selectedInterest)
    }

}
