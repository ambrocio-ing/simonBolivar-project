import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaContraAlumnoComponent } from './nueva-contra-alumno.component';

describe('NuevaContraAlumnoComponent', () => {
  let component: NuevaContraAlumnoComponent;
  let fixture: ComponentFixture<NuevaContraAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaContraAlumnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaContraAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
