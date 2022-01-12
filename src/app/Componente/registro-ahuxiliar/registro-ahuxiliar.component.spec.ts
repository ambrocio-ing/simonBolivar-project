import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAhuxiliarComponent } from './registro-ahuxiliar.component';

describe('RegistroAhuxiliarComponent', () => {
  let component: RegistroAhuxiliarComponent;
  let fixture: ComponentFixture<RegistroAhuxiliarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroAhuxiliarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroAhuxiliarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
