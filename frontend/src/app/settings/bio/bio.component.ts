import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';

@Component({
    selector: 'app-bio',
    templateUrl: './bio.component.html',
    styleUrls: ['./bio.component.css']
})
export class BioComponent implements OnInit {

    @Input() bio = '';
    @Output() bioTextEvent = new EventEmitter<string>();
    charCount = 0;
    constructor() {}

    ngOnInit(): void {
    }


    onInputChange(event: Event) {
        const target = event.target as HTMLInputElement;
        this.bioTextEvent.emit(target.value);
    }

}
