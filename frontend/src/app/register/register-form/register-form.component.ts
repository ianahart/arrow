import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

    constructor(private fb: FormBuilder) {}


    registerForm = this.fb.group({
        firstName: ['', [Validators.required, Validators.maxLength(75)]],
        lastName: [''],
    })


    ngOnInit(): void {
    }


    get firstName() {
        return this.registerForm.get('firstName')
    }
    get lastName() {
        return this.registerForm.get('lastName')
    }
}
