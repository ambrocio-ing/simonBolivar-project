import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadEntregadoComponent } from './actividad-entregado.component';

describe('ActividadEntregadoComponent', () => {
  let component: ActividadEntregadoComponent;
  let fixture: ComponentFixture<ActividadEntregadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActividadEntregadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadEntregadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
