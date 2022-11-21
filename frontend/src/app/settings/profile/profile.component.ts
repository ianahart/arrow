import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {IProfileFormData, IFormObj, IFile} from 'src/app/interfaces';
import {basicsState, filesState, interestsState, promptsState} from 'src/app/data/profile';
import {AuthService} from 'src/app/auth.service';
import {ProfileService} from 'src/app/profile.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


    interests: IProfileFormData[] = interestsState;
    prompts: IProfileFormData[] = promptsState;
    basics: IProfileFormData[] = basicsState;
    files: IFile[] = filesState;
    userId: null | number = null
    errors: string[] = []
    bio = '';
    selectedCount = 0;

    constructor(private router: Router, private authService: AuthService, private profileService: ProfileService) {
    }

    ngOnInit(): void {
        this.userId = this.authService.getUser().id;
    }


    alterFile(resource: {id: number, file: File | null}) {
        this.files = this.files.map((file) => {
            if (file.id === resource.id) {
                file.value = resource.file;
            }
            return file;
        })
    }


    private updateSelectedCount(selected: boolean) {
        if (selected) {
            this.selectedCount = this.selectedCount + 1;
        } else {
            this.selectedCount = this.selectedCount - 1;
        }
    }

    private updateSelected(list: IProfileFormData[], selectedItem: IFormObj) {
        this.updateSelectedCount(selectedItem.selected)
        return list.map((item) => {
            if (item.id === selectedItem.obj.id) {
                item.selected = selectedItem.selected
                if (item.value === '') {
                    item.value = selectedItem.answer as string;
                }
            }
        })
    }

    private getInterests() {
        return this.interests.filter((interest) => interest.selected)
    }


    selectCreativityInterest(selectedInterest: IFormObj) {
        if (this.getInterests().length === 5 && selectedInterest.selected) {
            return;
        }
        this.updateSelected(this.interests, selectedInterest)
    }

    selectPrompt(answer: IFormObj) {
        this.updateSelected(this.prompts, answer)
    }

    deselectPrompt(id: number) {
        this.prompts = this.prompts.map((prompt) => {
            if (prompt.id === id) {
                prompt.value = '';
                prompt.selected = !prompt.selected;
            }
            return prompt
        })
    }

    setBio(value: string) {
        this.bio = value;
    }


    saveBasic({id, value}: {id: number, value: string}) {
        this.basics = this.basics.map((basic) => {
            basic.value = id === basic.id ? value : basic.value;
            return basic
        })
    }

    private appendPhoto(formData: any, key: string, photo: File | null) {
        if (photo !== null) {
            formData.append(key, photo)
        }
    }

    onSubmit(e: Event) {
        e.preventDefault()
        this.errors = []
        const formData = new FormData()
        const [photoOne, photoTwo, photoThree] = this.files.map((file) => file.value)
        formData.append('interests', JSON.stringify(this.interests));
        formData.append('basics', JSON.stringify(this.basics));
        formData.append('prompts', JSON.stringify(this.prompts));
        formData.append('bio', this.bio);


        this.appendPhoto(formData, 'photo_one', photoOne)
        this.appendPhoto(formData, 'photo_two', photoTwo)
        this.appendPhoto(formData, 'photo_three', photoThree)


        if (!this.userId) return;
        this.profileService.updateProfile(this.userId, formData).subscribe((response) => {
            this.router.navigate(['/arrow'])
        }, (err) => {
            console.log(err)
            for (const [_, error] of Object.entries(err.error)) {
                console.log(error)
                this.errors.push(error as string)
            }
        })
    }
}
