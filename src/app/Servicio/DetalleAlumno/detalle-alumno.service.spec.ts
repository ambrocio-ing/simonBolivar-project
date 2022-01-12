import { TestBed } from '@angular/core/testing';

import { DetalleAlumnoService } from './detalle-alumno.service';

describe('DetalleAlumnoService', () => {
  let service: DetalleAlumnoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleAlumnoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
