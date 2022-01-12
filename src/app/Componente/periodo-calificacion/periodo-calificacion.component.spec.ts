import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodoCalificacionComponent } from './periodo-calificacion.component';

describe('PeriodoCalificacionComponent', () => {
  let component: PeriodoCalificacionComponent;
  let fixture: ComponentFixture<PeriodoCalificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriodoCalificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodoCalificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
