import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaContraDocenteComponent } from './nueva-contra-docente.component';

describe('NuevaContraDocenteComponent', () => {
  let component: NuevaContraDocenteComponent;
  let fixture: ComponentFixture<NuevaContraDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaContraDocenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaContraDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
