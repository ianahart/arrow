import {Component, OnInit} from '@angular/core';
import {IProfileFormData, IFormObj, IFile} from 'src/app/interfaces';
import {basicsState, filesState, interestsState, promptsState} from 'src/app/data/profile';

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
    bio = '';
    selectedCount = 0;
    constructor() {
    }

    ngOnInit(): void {
        console.log('inonit')
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































}
