import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisarActividadesComponent } from './revisar-actividades.component';

describe('RevisarActividadesComponent', () => {
  let component: RevisarActividadesComponent;
  let fixture: ComponentFixture<RevisarActividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisarActividadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisarActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
