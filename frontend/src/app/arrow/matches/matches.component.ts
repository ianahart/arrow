import {Component, OnInit} from '@angular/core';
import {IMatch} from 'src/app/interfaces';
import {ArrowService} from '../arrow.service';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-matches',
    templateUrl: './matches.component.html',
    styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {



    matches: IMatch[] = []
    page = 0;
    error = '';
    has_next = false;
    faChevronRight = faChevronRight;

    constructor(private arrowService: ArrowService) {}

    ngOnInit(): void {
        this.arrowService.loadMatches(this.page).subscribe((response) => {
            this.page = response.page;
            this.has_next = response.has_next;
            this.matches = [...response.matches]
        }, (err) => {
            console.log(err)
            this.error = 'No more matches found';
        })
    }


    loadMoreMatches() {
        if (!this.has_next) return;
        this.arrowService.loadMatches(this.page).subscribe((response) => {
            this.page = response.page;
            this.has_next = response.has_next;
            this.matches = [...this.matches, ...response.matches]
        }, (err) => {
            console.log(err)
            this.error = 'No more matches found';
        })

    }
}
