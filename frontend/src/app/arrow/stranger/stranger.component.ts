import {Component, OnInit} from '@angular/core';
import {strangerState} from 'src/app/data';
import {IStranger} from 'src/app/interfaces';
import {StrangerService} from 'src/app/stranger.service';
import {faBriefcase, faUserGraduate, faLocationPin, faCity} from '@fortawesome/free-solid-svg-icons';





@Component({
    selector: 'app-stranger',
    templateUrl: './stranger.component.html',
    styleUrls: ['./stranger.component.css']
})
export class StrangerComponent implements OnInit {

    stranger: IStranger = strangerState;

    constructor(private strangerService: StrangerService) {}

    ngOnInit(): void {
        this.strangerService.loadStranger().subscribe((response) => {
            console.log(response)
            this.stranger = response.stranger;
        }, (err) => {
            console.log(err)
        });
    }



    get textColor() {
        return this.stranger.images.length ? '#fff' : '#000';
    }

    get imagePos() {
        return this.stranger.images.length ? 'absolute' : 'relative';
    }

}

