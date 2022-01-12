import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadPlanteadaComponent } from './actividad-planteada.component';

describe('ActividadPlanteadaComponent', () => {
  let component: ActividadPlanteadaComponent;
  let fixture: ComponentFixture<ActividadPlanteadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActividadPlanteadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadPlanteadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
