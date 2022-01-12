import { TestBed } from '@angular/core/testing';

import { PeriodoCalificacionService } from './periodo-calificacion.service';

describe('PeriodoCalificacionService', () => {
  let service: PeriodoCalificacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeriodoCalificacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
