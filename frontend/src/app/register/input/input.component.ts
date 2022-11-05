import {Component, OnInit, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

    @Input() label: string = '';
    @Input() name = '';
    @Input() required = false;
    @Input() validator = false;
    @Input() id = '';
    @Input() group = '';
    @Input() controlName = '';
    @Input() errorMsg = '';

    constructor() {}

    ngOnInit(): void {
    }

}
