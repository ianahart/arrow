import {Component, Input, OnInit} from '@angular/core';
import {IStranger} from 'src/app/interfaces';
import {strangerState} from 'src/app/data';
import {faLocationPin} from '@fortawesome/free-solid-svg-icons';
@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    @Input() user: IStranger = strangerState;



    faLocationPin = faLocationPin;

    constructor() {}

    ngOnInit(): void {
    }




    get textColor() {
        return this.user.images.length ? '#fff' : '#000';
    }

    get imagePos() {
        return this.user.images.length ? 'absolute' : 'relative';
    }


}
