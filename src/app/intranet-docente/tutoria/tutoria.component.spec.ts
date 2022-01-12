import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutoriaComponent } from './tutoria.component';

describe('TutoriaComponent', () => {
  let component: TutoriaComponent;
  let fixture: ComponentFixture<TutoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
