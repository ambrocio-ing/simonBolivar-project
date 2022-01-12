import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntAdmNotasComponent } from './int-adm-notas.component';

describe('IntAdmNotasComponent', () => {
  let component: IntAdmNotasComponent;
  let fixture: ComponentFixture<IntAdmNotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntAdmNotasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntAdmNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
