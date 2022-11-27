import {Component, OnInit} from '@angular/core';
import {IMatch} from 'src/app/interfaces';
import {ArrowService} from '../arrow.service';

@Component({
    selector: 'app-matches',
    templateUrl: './matches.component.html',
    styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {



    matches: IMatch[] = []

    constructor(private arrowService: ArrowService) {}

    ngOnInit(): void {
        this.arrowService.loadMatches().subscribe((response) => {
            console.log(response)
            this.matches = [...response.matches]
        }, (err) => {
            console.log(err)
        })
    }



}
