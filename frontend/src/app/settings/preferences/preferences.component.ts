import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/auth.service';
import {SettingService} from 'src/app/setting.service';

@Component({
    selector: 'app-preferences',
    templateUrl: './preferences.component.html',
    styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {

    settingsId = 0;
    toggled = false;
    constructor(
        private authService: AuthService,
        private settingService: SettingService
    ) {}

    ngOnInit(): void {
        this.settingService.retrieveSettings(this.authService.getUser().id).subscribe(
            response => {
                this.settingsId = response.id
                this.toggled = response.incognito;
            })
    }

    toggle() {
        this.toggled = !this.toggled;
        this.settingService.updateIncognitoMode(this.settingsId, this.toggled)
            .subscribe((response) => {
                console.log(response)
            })
    }
}
