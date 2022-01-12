import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCompetenciaModaComponent } from './detalle-competencia-moda.component';

describe('DetalleCompetenciaModaComponent', () => {
  let component: DetalleCompetenciaModaComponent;
  let fixture: ComponentFixture<DetalleCompetenciaModaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleCompetenciaModaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCompetenciaModaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
