import {Component, OnInit} from '@angular/core';
import {strangerState} from 'src/app/data';
import {IMatchPreview, IStranger} from 'src/app/interfaces';
import {StrangerService} from 'src/app/stranger.service';
import {faHeart, faStar, faLocationPin, faClose} from '@fortawesome/free-solid-svg-icons';





@Component({
    selector: 'app-stranger',
    templateUrl: './stranger.component.html',
    styleUrls: ['./stranger.component.css']
})
export class StrangerComponent implements OnInit {

    stranger: IStranger = strangerState;
    matchPreview: IMatchPreview = {images: [], first_name: '', last_name: '', id: 0}
    errorMsg = '';
    faLocationPin = faLocationPin;
    faClose = faClose;
    faHeart = faHeart;
    faStar = faStar;
    modalOpen = false;

    constructor(private strangerService: StrangerService) {}

    ngOnInit(): void {
        this.strangerService.loadStranger().subscribe((response) => {
            if (!response.stranger) return;
            this.stranger = response.stranger;
        }, (err) => {
            if (err.status === 404) {
                this.errorMsg = 'No more users. Try adjusting your location settings.'
            }

        });
    }


    openModal() {
        this.modalOpen = true;
    }

    closeModal() {
        this.modalOpen = false;
        this.matchPreview = {
            images: [],
            first_name: '',
            last_name: '',
            id: 0,
        }
    }



    onAccept() {
        const stranger = this.stranger.user_id;
        this.strangerService.acceptStranger(stranger).subscribe((response) => {
            console.log(response)
            if (Object.keys(response).includes('match_preview')) {
                console.log(response)
                if (!response.match_preview || !response.stranger) return;
                this.matchPreview = response.match_preview;
                this.stranger = response.stranger;
                this.modalOpen = true;
            } else {
                if (response.stranger) {
                    this.stranger = response.stranger;

                }
            }
        }, (err) => {
            if (err.status === 404) {
                this.errorMsg = 'No more users. Try adjusting your location settings.'
            }

        })
    }



    onDeny() {
        const stranger = this.stranger.user_id;
        this.strangerService.denyStranger(stranger).subscribe((response) => {
            if (response.stranger) {
                this.stranger = response.stranger;
            }
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

