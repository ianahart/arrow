import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, ValidatorFn, AbstractControl} from '@angular/forms';
import {AuthService} from 'src/app/auth.service';
import {ConfirmPasswordValidator} from 'src/app/validators/confirm-password.validator';
@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

    constructor(private fb: FormBuilder, private authService: AuthService) {}

    passwordType = 'password';

    registerForm = this.fb.group({
        firstName: ['', [Validators.required, Validators.maxLength(75)]],
        lastName: ['', [Validators.required, Validators.maxLength(75)]],
        email: ['', [Validators.required, Validators.email]],
        gender: ['woman', [Validators.required]],
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
            return;
        }
        console.log('Submitted');
        this.authService.register(this.registerForm.value).subscribe((response) => {
            console.log(response)
        }, (error) => console.log(error))

    }


    togglePasswordVisibility(event: any) {
        if (this.passwordType === 'password') {
            console.log('IFFFFFFFFFFFF')
            this.passwordType = 'text'
        } else if (this.passwordType === 'text') {
            console.log('ELSEEEEEEEEE')
            this.passwordType = 'password'
        }
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
    get gender() {
        return this.registerForm.get('gender');
    }
}
