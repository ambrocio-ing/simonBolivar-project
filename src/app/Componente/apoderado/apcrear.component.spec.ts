import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApcrearComponent } from './apcrear.component';

describe('ApcrearComponent', () => {
  let component: ApcrearComponent;
  let fixture: ComponentFixture<ApcrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApcrearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApcrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
