import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoFotoComponent } from './empleado-foto.component';

describe('EmpleadoFotoComponent', () => {
  let component: EmpleadoFotoComponent;
  let fixture: ComponentFixture<EmpleadoFotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpleadoFotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoFotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
