import { TestBed } from '@angular/core/testing';

import { DetaleBimestreCompetenciaService } from './detale-bimestre-competencia.service';

describe('DetaleBimestreCompetenciaService', () => {
  let service: DetaleBimestreCompetenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetaleBimestreCompetenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
