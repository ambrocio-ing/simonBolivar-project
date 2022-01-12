import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCompetenciaComponent } from './detalle-competencia.component';

describe('DetalleCompetenciaComponent', () => {
  let component: DetalleCompetenciaComponent;
  let fixture: ComponentFixture<DetalleCompetenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleCompetenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCompetenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
