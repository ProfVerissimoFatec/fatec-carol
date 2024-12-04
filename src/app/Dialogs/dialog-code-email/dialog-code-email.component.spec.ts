import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCodeEmailComponent } from './dialog-code-email.component';

describe('DialogCodeEmailComponent', () => {
  let component: DialogCodeEmailComponent;
  let fixture: ComponentFixture<DialogCodeEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCodeEmailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogCodeEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
