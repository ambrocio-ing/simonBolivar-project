import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntAreAluComponent } from './int-are-alu.component';

describe('IntAreAluComponent', () => {
  let component: IntAreAluComponent;
  let fixture: ComponentFixture<IntAreAluComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntAreAluComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntAreAluComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
