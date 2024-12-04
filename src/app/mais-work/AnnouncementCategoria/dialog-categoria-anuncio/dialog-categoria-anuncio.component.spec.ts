import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCategoriaAnuncioComponent } from './dialog-categoria-anuncio.component';

describe('DialogCategoriaAnuncioComponent', () => {
  let component: DialogCategoriaAnuncioComponent;
  let fixture: ComponentFixture<DialogCategoriaAnuncioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCategoriaAnuncioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogCategoriaAnuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
