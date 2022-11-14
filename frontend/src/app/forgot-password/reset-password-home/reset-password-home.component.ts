import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from 'src/app/auth.service';
import {MatchPassword} from 'src/app/validators/match-password';
@Component({
    selector: 'app-reset-password-home',
    templateUrl: './reset-password-home.component.html',
    styleUrls: ['./reset-password-home.component.css']
})
export class ResetPasswordHomeComponent implements OnInit {

    uid = 0;
    token = '';
    error = '';

    resetPasswordForm = this.fb.group({
        password: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$")]],
        confirmPassword: ['', [Validators.required]]
    },
        {
            validator: [this.matchPassword.validate]
        }
    )



    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private matchPassword: MatchPassword,
        private authService: AuthService,
        private fb: FormBuilder) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.token = params['token'];
            this.uid = params['uid'];
        })
    }


    formValues() {
        return {
            uid: this.uid,
            token: this.token,
            password: this.resetPasswordForm.get('password')?.value,
        }
    }


    onSubmit() {
        this.error = '';
        if (this.resetPasswordForm.invalid) {
            return;
        }


        this.authService.resetPassword(this.formValues()).subscribe(response => {
            this.router.navigate(['/'])
        }, (err) => {
            this.error = err.error.error
        })


    }

}
