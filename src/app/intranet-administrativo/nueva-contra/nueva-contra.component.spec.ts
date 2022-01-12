import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaContraComponent } from './nueva-contra.component';

describe('NuevaContraComponent', () => {
  let component: NuevaContraComponent;
  let fixture: ComponentFixture<NuevaContraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaContraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaContraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
