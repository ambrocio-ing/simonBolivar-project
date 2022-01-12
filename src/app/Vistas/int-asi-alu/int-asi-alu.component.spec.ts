import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntAsiAluComponent } from './int-asi-alu.component';

describe('IntAsiAluComponent', () => {
  let component: IntAsiAluComponent;
  let fixture: ComponentFixture<IntAsiAluComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntAsiAluComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntAsiAluComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
