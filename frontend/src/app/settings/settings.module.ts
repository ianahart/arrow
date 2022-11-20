import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SettingsRoutingModule} from './settings-routing.module';
import {SettingsHomeComponent} from './settings-home/settings-home.component';
import {PreferencesComponent} from './preferences/preferences.component';
import {FiltersComponent} from './filters/filters.component';
import {ProfileComponent} from './profile/profile.component';
import {InterestComponent} from './interest/interest.component';
import {ModalComponent} from './modal/modal.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {PromptsComponent} from './prompts/prompts.component';
import {PromptComponent} from './prompt/prompt.component';
import {BioComponent} from './bio/bio.component';
import {BasicsComponent} from './basics/basics.component';
import { UploaderComponent } from './uploader/uploader.component';
@NgModule({
    declarations: [
        SettingsHomeComponent,
        PreferencesComponent,
        FiltersComponent,
        ProfileComponent,
        InterestComponent,
        ModalComponent,
        PromptsComponent,
        PromptComponent,
        BioComponent,
        BasicsComponent,
        UploaderComponent,
    ],
    imports: [
        CommonModule,
        SettingsRoutingModule,
        FontAwesomeModule,
    ]
})
export class SettingsModule {}
