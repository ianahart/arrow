import {Component, OnInit} from '@angular/core';
import {strangerState} from 'src/app/data';
import {IStranger} from 'src/app/interfaces';
import {StrangerService} from 'src/app/stranger.service';
import {faHeart, faLocationPin, faClose} from '@fortawesome/free-solid-svg-icons';





@Component({
    selector: 'app-stranger',
    templateUrl: './stranger.component.html',
    styleUrls: ['./stranger.component.css']
})
export class StrangerComponent implements OnInit {

    stranger: IStranger = strangerState;
    errorMsg = '';
    faLocationPin = faLocationPin;
    faClose = faClose;
    faHeart = faHeart;

    constructor(private strangerService: StrangerService) {}

    ngOnInit(): void {
        this.strangerService.loadStranger().subscribe((response) => {
            console.log(response)
            this.stranger = response.stranger;
        }, (err) => {
            if (err.status === 404) {
                this.errorMsg = 'No more users. Try adjusting your location settings.'
            }

        });
    }



    onAccept() {
        const stranger = this.stranger.user_id;
        this.strangerService.acceptStranger(stranger).subscribe((response) => {
            console.log(response)
        }, (err) => {
            if (err.status === 404) {
                this.errorMsg = 'No more users. Try adjusting your location settings.'
            }

        })
    }



    onDeny() {
        const stranger = this.stranger.user_id;
        this.strangerService.denyStranger(stranger).subscribe((response) => {
            this.stranger = response.stranger;
            console.log(response)
        }, (err) => {
            if (err.status === 404) {
                this.errorMsg = 'No more users. Try adjusting your location settings.'
            }

        })
    }


    get textColor() {
        return this.stranger.images.length ? '#fff' : '#000';
    }

    get imagePos() {
        return this.stranger.images.length ? 'absolute' : 'relative';
    }

}

