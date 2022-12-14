import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AuthService} from 'src/app/auth.service';
@Component({
    selector: 'app-login-home',
    templateUrl: './login-home.component.html',
    styleUrls: ['./login-home.component.css']
})
export class LoginHomeComponent implements OnInit {

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {}



    errors: string[] = []
    loginForm = this.fb.group({
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
    })

    ngOnInit(): void {
    }

    applyErrors(err: any) {

        if (err.status === 400) {
            for (const [_, val] of Object.entries(err.error)) {
                this.errors.push(val as string)
            }
        }
    }

    onSubmit(event: any) {
        event.preventDefault()
        this.errors = []
        if (!this.loginForm.valid) {
            return;
        }
        this.authService.login(this.loginForm.value).subscribe((response) => {
            this.authService.setTokens(response.tokens);
            this.authService.setUser(response.user);
            this.router.navigate(['/', 'arrow'])


        }, (err) => {
            this.applyErrors(err)
        })
    }

    get email() {
        return this.loginForm.get('email');
    }

    get password() {
        return this.loginForm.get('password');
    }
}
