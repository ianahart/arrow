import {HostListener, Input, Component, ElementRef, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-click-away-menu',
    templateUrl: './click-away-menu.component.html',
    styleUrls: ['./click-away-menu.component.css']
})
export class ClickAwayMenuComponent implements OnInit {

    @Input() menuOpen = false;
    @Input() minHeight = 100;
    @Input() width = 100;
    @Input() top = 0;
    @Input() right = 0;


    @Output() menuOpenEvent = new EventEmitter<boolean>()

    constructor(private elementRef: ElementRef) {}

    ngOnInit(): void {


    }
    @HostListener('document:click', ['$event.target'])
    public onPageClick() {
        event?.stopPropagation()
        const trigger = (event?.target as HTMLElement).id
        const clickedInside = this.elementRef.nativeElement.contains(event?.target) || trigger === 'menuTrigger';
        if (!clickedInside) {
            this.menuOpenEvent.emit(false);
        }
    }
}
