import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntClasesComponent } from './int-clases.component';

describe('IntClasesComponent', () => {
  let component: IntClasesComponent;
  let fixture: ComponentFixture<IntClasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntClasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntClasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
