import { TestBed } from '@angular/core/testing';

import { FichaAsistenciaService } from './ficha-asistencia.service';

describe('FichaAsistenciaService', () => {
  let service: FichaAsistenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FichaAsistenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
