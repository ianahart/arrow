import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrangerComponent } from './stranger.component';

describe('StrangerComponent', () => {
  let component: StrangerComponent;
  let fixture: ComponentFixture<StrangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrangerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
