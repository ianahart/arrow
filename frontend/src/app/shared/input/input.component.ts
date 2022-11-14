import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

    @Input() placeholder = '';
    @Input() type = '';
    @Input() id = '';
    @Input() label = '';
    @Input() control!: FormControl;
    @Input() group!: FormGroup;

    constructor() {}

    ngOnInit(): void {
    }
}

