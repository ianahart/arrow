import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, ValidatorFn, AbstractControl} from '@angular/forms';
import {ConfirmPasswordValidator} from 'src/app/validators/confirm-password.validator';
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
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$")]],
        confirmPassword: ['', [Validators.required]]
    },
        {
            validator: ConfirmPasswordValidator("password", "confirmPassword")
        }
    )


    ngOnInit(): void {
    }


    onSubmit(event: any) {
        event.preventDefault()
        if (!this.registerForm.valid) {
            console.log('Errors present')
            return;
        }
        console.log('Submitted');
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

    get password() {
        return this.registerForm.get('password')
    }
    get confirmPassword() {
        return this.registerForm.get('confirmPassword')
    }
}
