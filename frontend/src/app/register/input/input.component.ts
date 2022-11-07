import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

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
    @Input() type = '';
    @Input() passwordType = 'password';

    @Output() toggleEvent = new EventEmitter<string>();


    faEye = faEye;
    faEyeSlash = faEyeSlash;


    constructor() {}

    ngOnInit(): void {
    }

    onClick() {
        this.toggleEvent.emit(this.passwordType)
    }
}
