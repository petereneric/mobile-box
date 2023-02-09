import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCSignupFormComponent } from './mc-signup-form.component';

describe('MCSignupFormComponent', () => {
  let component: MCSignupFormComponent;
  let fixture: ComponentFixture<MCSignupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MCSignupFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCSignupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
