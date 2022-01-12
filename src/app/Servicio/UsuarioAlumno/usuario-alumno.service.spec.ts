import { TestBed } from '@angular/core/testing';

import { UsuarioAlumnoService } from './usuario-alumno.service';

describe('UsuarioAlumnoService', () => {
  let service: UsuarioAlumnoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioAlumnoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
