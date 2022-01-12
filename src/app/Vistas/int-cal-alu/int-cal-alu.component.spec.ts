import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntCalAluComponent } from './int-cal-alu.component';

describe('IntCalAluComponent', () => {
  let component: IntCalAluComponent;
  let fixture: ComponentFixture<IntCalAluComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntCalAluComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntCalAluComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
