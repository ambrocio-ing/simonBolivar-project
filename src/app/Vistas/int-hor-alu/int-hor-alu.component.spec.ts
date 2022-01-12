import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntHorAluComponent } from './int-hor-alu.component';

describe('IntHorAluComponent', () => {
  let component: IntHorAluComponent;
  let fixture: ComponentFixture<IntHorAluComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntHorAluComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntHorAluComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
