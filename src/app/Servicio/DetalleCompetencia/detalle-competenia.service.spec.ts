import { TestBed } from '@angular/core/testing';

import { DetalleCompeteniaService } from './detalle-competenia.service';

describe('DetalleCompeteniaService', () => {
  let service: DetalleCompeteniaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleCompeteniaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
