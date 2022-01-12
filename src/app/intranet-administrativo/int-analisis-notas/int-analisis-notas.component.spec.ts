import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntAnalisisNotasComponent } from './int-analisis-notas.component';

describe('IntAnalisisNotasComponent', () => {
  let component: IntAnalisisNotasComponent;
  let fixture: ComponentFixture<IntAnalisisNotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntAnalisisNotasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntAnalisisNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
