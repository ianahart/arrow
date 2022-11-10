import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowHomeComponent } from './arrow-home.component';

describe('ArrowHomeComponent', () => {
  let component: ArrowHomeComponent;
  let fixture: ComponentFixture<ArrowHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrowHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrowHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
