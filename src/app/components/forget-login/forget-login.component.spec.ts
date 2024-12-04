import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetLoginComponent } from './forget-login.component';

describe('ForgetLoginComponent', () => {
  let component: ForgetLoginComponent;
  let fixture: ComponentFixture<ForgetLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgetLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForgetLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
