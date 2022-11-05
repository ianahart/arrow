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
        lastName: ['', [Validators.required, Validators.maxLength(75)]],
        email: ['', [Validators.required, Validators.email]]
    })


    ngOnInit(): void {
    }

    onSubmit(event: any) {
        console.log(event)
        console.log('submitted')
        event.preventDefault()
        console.log(this.registerForm.valid)
        console.log(this.registerForm.value)
    }

    get firstName() {
        return this.registerForm.get('firstName')
    }
    get lastName() {
        return this.registerForm.get('lastName')
    }

    get email() {
        return this.registerForm.get('email')
    }
}
