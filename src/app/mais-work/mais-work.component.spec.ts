import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaisWorkComponent } from './mais-work.component';

describe('MaisWorkComponent', () => {
  let component: MaisWorkComponent;
  let fixture: ComponentFixture<MaisWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaisWorkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaisWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
