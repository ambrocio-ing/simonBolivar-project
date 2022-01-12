import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntAdmDocComponent } from './int-adm-doc.component';

describe('IntAdmDocComponent', () => {
  let component: IntAdmDocComponent;
  let fixture: ComponentFixture<IntAdmDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntAdmDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntAdmDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
