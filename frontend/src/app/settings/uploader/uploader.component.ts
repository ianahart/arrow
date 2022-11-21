import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {faClose, faPlus} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-uploader',
    templateUrl: './uploader.component.html',
    styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {

    @Input() minHeight = '100';
    @Input() id = 0;
    @Input() value = null;
    @Output() uploadEvent = new EventEmitter<{id: number, file: File | null}>();

    error = '';
    faPlus = faPlus;
    faClose = faClose;
    constructor() {}

    ngOnInit(): void {
    }

    onRemoveFile(id: number) {
        const data = {id, file: null}
        this.uploadEvent.emit(data)
    }

    onInputChange(e: Event) {
        const target = e.target as HTMLInputElement;
        if (target.files) {
            this.save(target.files)
        }
    }

    save(files: FileList) {
        this.error = '';
        if (files) {
            if (files[0].size > 1500000) {
                console.log('ERRRROr')
                this.error = 'File size exceeded.'
                return;
            }
            const data = {id: this.id, file: files[0]}
            this.uploadEvent.emit(data)
        }


    }

    onDrop(e: DragEvent) {
        if (e.dataTransfer?.files) {
            this.save(e.dataTransfer?.files)

        }
    }
}
