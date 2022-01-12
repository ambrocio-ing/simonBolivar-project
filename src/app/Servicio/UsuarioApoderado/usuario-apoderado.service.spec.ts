import { TestBed } from '@angular/core/testing';

import { UsuarioApoderadoService } from './usuario-apoderado.service';

describe('UsuarioApoderadoService', () => {
  let service: UsuarioApoderadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioApoderadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
