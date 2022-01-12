import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtraCalificacionModalComponent } from './otra-calificacion-modal.component';

describe('OtraCalificacionModalComponent', () => {
  let component: OtraCalificacionModalComponent;
  let fixture: ComponentFixture<OtraCalificacionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtraCalificacionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtraCalificacionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
