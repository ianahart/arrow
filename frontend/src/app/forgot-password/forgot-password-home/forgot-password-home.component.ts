import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from 'src/app/auth.service';

@Component({
    selector: 'app-forgot-password-home',
    templateUrl: './forgot-password-home.component.html',
    styleUrls: ['./forgot-password-home.component.css']
})
export class ForgotPasswordHomeComponent implements OnInit {
    errors: string[] = []
    constructor(private authService: AuthService) {}

    ngOnInit(): void {
    }



    forgotPasswordForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email])
    })


    onSubmit() {
        this.errors = []
        if (this.forgotPasswordForm.invalid) {
            return;
        }
        const form = this.forgotPasswordForm.value;

        this.authService.forgotPasswordEmail(form).subscribe((response) => {
            console.log(response)

            this.forgotPasswordForm.reset()
        }, (err) => {
            if (err.status === 400) {
                this.errors.push(err.error.errors.email);

            }
        })
    }


    get email() {
        return this.forgotPasswordForm.get('email')
    }

}
