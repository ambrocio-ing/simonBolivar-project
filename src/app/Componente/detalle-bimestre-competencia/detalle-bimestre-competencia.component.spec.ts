import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleBimestreCompetenciaComponent } from './detalle-bimestre-competencia.component';


describe('DetalleBimestreCompetenciaComponent', () => {
  let component: DetalleBimestreCompetenciaComponent;
  let fixture: ComponentFixture<DetalleBimestreCompetenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleBimestreCompetenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleBimestreCompetenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
