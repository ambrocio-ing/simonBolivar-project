import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntAsiPersonalComponent } from './int-asi-personal.component';

describe('IntAsiPersonalComponent', () => {
  let component: IntAsiPersonalComponent;
  let fixture: ComponentFixture<IntAsiPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntAsiPersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntAsiPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
