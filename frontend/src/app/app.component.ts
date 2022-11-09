import {Component} from '@angular/core';
import {AuthService} from './auth.service';
import {OnInit} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'frontend';

    constructor(private authService: AuthService) {

    }

    ngOnInit() {
        this.authService.syncUser().subscribe((response) => {
            this.authService.setUser(response.user)
        })
    }
}
