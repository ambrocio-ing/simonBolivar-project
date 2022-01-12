import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntAlumnoComponent } from './int-alumno.component';

describe('IntAlumnoComponent', () => {
  let component: IntAlumnoComponent;
  let fixture: ComponentFixture<IntAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntAlumnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
