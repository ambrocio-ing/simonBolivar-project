import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadArchivoComponent } from './actividad-archivo.component';

describe('ActividadArchivoComponent', () => {
  let component: ActividadArchivoComponent;
  let fixture: ComponentFixture<ActividadArchivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActividadArchivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
