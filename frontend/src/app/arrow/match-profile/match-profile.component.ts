import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {strangerState} from 'src/app/data';
import {IStranger} from 'src/app/interfaces';
import {ArrowService} from '../arrow.service';
@Component({
    selector: 'app-match-profile',
    templateUrl: './match-profile.component.html',
    styleUrls: ['./match-profile.component.css']
})
export class MatchProfileComponent implements OnInit {

    constructor(private arrowService: ArrowService, private router: ActivatedRoute) {}

    profile: IStranger = strangerState;
    userId: string | null = '';


    ngOnInit(): void {

        const userId = this.router.snapshot.paramMap.get('id');
        if (userId === null) return;
        this.userId = this.router.snapshot.paramMap.get('id')


        this.arrowService.loadUserProfile(this.userId).subscribe((response) => {
            if (response.profile) {
                this.profile = response.profile;
            }
        }, (err) => {
            console.log(err);
        })
    }

}
