import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from 'src/app/auth.service';
import {MatchPassword} from 'src/app/validators/match-password';
import {Date} from 'src/app/validators/date';
@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

    constructor(private fb: FormBuilder,
        private authService: AuthService,
        private matchPassword: MatchPassword,
        private date: Date,
        private router: Router) {}

    passwordType = 'password';
    errors: string[] = []

    registerForm = this.fb.group({
        firstName: ['', [Validators.required, Validators.maxLength(75)]],
        lastName: ['', [Validators.required, Validators.maxLength(75)]],
        dob: ['', [Validators.required, this.date]],
        email: ['', [Validators.required, Validators.email]],
        gender: ['woman', [Validators.required]],
        password: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$")]],
        confirmPassword: ['', [Validators.required]]
    },
        {
            validator: [this.matchPassword.validate]
        }
    )


    ngOnInit(): void {}


    formValues() {
        return {
            first_name: this.registerForm.value.firstName,
            last_name: this.registerForm.value.lastName,
            dob: this.registerForm.value.dob,
            email: this.registerForm.value.email,
            gender: this.registerForm.value.gender,
            password: this.registerForm.value.password,
            confirm_password: this.registerForm.value.confirmPassword
        }
    }


    onSubmit(event: any) {
        event.preventDefault()
        this.errors = []
        if (!this.registerForm.valid) {
            return;
        }
        this.authService.register(this.formValues()).subscribe((response) => {
            this.router.navigate(['/'])
        }, (error) => this.applyErrors(error))


    }

    applyErrors({error}: any) {
        for (const [_, val] of Object.entries(error.errors)) {
            this.errors.push(val as string)
        }
    }



    togglePasswordVisibility(event: any) {
        if (this.passwordType === 'password') {
            this.passwordType = 'text'
        } else if (this.passwordType === 'text') {
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

    get dob() {
        return this.registerForm.get('dob')
    }
}
