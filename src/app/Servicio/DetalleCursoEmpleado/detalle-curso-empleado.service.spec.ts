import { TestBed } from '@angular/core/testing';

import { DetalleCursoEmpleadoService } from './detalle-curso-empleado.service';

describe('DetalleCursoEmpleadoService', () => {
  let service: DetalleCursoEmpleadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleCursoEmpleadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
