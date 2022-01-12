import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivoEntregadoComponent } from './archivo-entregado.component';

describe('ArchivoEntregadoComponent', () => {
  let component: ArchivoEntregadoComponent;
  let fixture: ComponentFixture<ArchivoEntregadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivoEntregadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivoEntregadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
