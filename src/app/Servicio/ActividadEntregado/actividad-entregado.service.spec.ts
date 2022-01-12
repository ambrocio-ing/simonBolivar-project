import { TestBed } from '@angular/core/testing';

import { ActividadEntregadoService } from './actividad-entregado.service';

describe('ActividadEntregadoService', () => {
  let service: ActividadEntregadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActividadEntregadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
