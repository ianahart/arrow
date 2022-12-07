import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AuthService} from 'src/app/auth.service';
import {SettingService} from 'src/app/setting.service';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private settingService: SettingService,
    ) {

    }

    settingsId = 0;

    ngOnInit(): void {
        this.settingService.retrieveSettings(this.authService.getUser().id)
            .subscribe((settings) => {
                this.settingsId = settings.id;
                this.form.controls['min_age'].setValue(settings.min_age ?? 18)
                this.form.controls['max_age'].setValue(settings.max_age ?? 36)
                this.form.controls['gender'].setValue(settings.gender ?? 'woman')
                this.form.controls['distance_away'].setValue(settings.distance_away ?? 0)

            })
    }


    form = this.fb.group({
        distance_away: [0, []],
        min_age: [18, []],
        max_age: [36, []],
        gender: ['woman', []],
    })




    onSubmit() {
        console.log(this.form.value.max_age)
        if (this.form.value.max_age && this.form.value.min_age) {
            if (this.form.value.max_age < this.form.value.min_age) {
                return;
            }
        }
        this.settingService.updateSettings(this.settingsId, this.form.value).subscribe((response) => {
            console.log(response)
        });
    }

    get distance_away() {
        return this.form.get('distance_away');
    }

    get min_age() {
        return this.form.get('min_age');
    }

    get max_age() {
        return this.form.get('max_age')
    }

    get gender() {
        return this.form.get('gender');
    }
}

