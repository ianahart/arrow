import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {IMatch} from 'src/app/interfaces';
@Component({
    selector: 'app-conversations',
    templateUrl: './conversations.component.html',
    styleUrls: ['./conversations.component.css']
})
export class ConversationsComponent implements OnInit {

    @Input() matches: IMatch[] = []
    @Input() has_next: boolean = false;
    @Output() loadMoreEvent = new EventEmitter()
    @Output() showConversationEvent = new EventEmitter<number>()
    @Output() unmatchEvent = new EventEmitter<number>()

    constructor() {}

    ngOnInit(): void {
    }

    onShowConversation(id: number) {
        this.showConversationEvent.emit(id)
    }

    onHasMore() {
        this.loadMoreEvent.emit()
    }

    onUnmatch(id: number) {
        this.unmatchEvent.emit(id)
    }
}
