import { TestBed } from '@angular/core/testing';

import { ApServicioService } from './ap-servicio.service';

describe('ApServicioService', () => {
  let service: ApServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
