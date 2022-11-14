import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordHomeComponent } from './reset-password-home.component';

describe('ResetPasswordHomeComponent', () => {
  let component: ResetPasswordHomeComponent;
  let fixture: ComponentFixture<ResetPasswordHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
