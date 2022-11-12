import {Component, OnInit} from '@angular/core';
import {ArrowService} from '../arrow.service';
@Component({
    selector: 'app-arrow-home',
    templateUrl: './arrow-home.component.html',
    styleUrls: ['./arrow-home.component.css']
})
export class ArrowHomeComponent implements OnInit {

    constructor(private arrowService: ArrowService) {}

    ngOnInit(): void {
        this.arrowService.loadMatch().subscribe((response) => {
            console.log(response)
        })
    }
}
