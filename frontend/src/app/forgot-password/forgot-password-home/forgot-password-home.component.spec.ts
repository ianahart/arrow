import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordHomeComponent } from './forgot-password-home.component';

describe('ForgotPasswordHomeComponent', () => {
  let component: ForgotPasswordHomeComponent;
  let fixture: ComponentFixture<ForgotPasswordHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
