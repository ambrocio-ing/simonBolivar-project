import { TestBed } from '@angular/core/testing';

import { UsuarioRoleService } from './usuario-role.service';

describe('UsuarioRoleService', () => {
  let service: UsuarioRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
