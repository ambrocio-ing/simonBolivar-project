import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoFotoComponent } from './alumno-foto.component';

describe('AlumnoFotoComponent', () => {
  let component: AlumnoFotoComponent;
  let fixture: ComponentFixture<AlumnoFotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoFotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoFotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
