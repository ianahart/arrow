import {Component, OnInit} from '@angular/core';
import {faCircleUser} from '@fortawesome/free-solid-svg-icons';
@Component({
    selector: 'app-auth-nav-bar',
    templateUrl: './auth-nav-bar.component.html',
    styleUrls: ['./auth-nav-bar.component.css']
})
export class AuthNavBarComponent implements OnInit {

    faCircleUser = faCircleUser


    constructor() {}

    ngOnInit(): void {
    }

}
