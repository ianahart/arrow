import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickAwayMenuComponent } from './click-away-menu.component';

describe('ClickAwayMenuComponent', () => {
  let component: ClickAwayMenuComponent;
  let fixture: ComponentFixture<ClickAwayMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClickAwayMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClickAwayMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
