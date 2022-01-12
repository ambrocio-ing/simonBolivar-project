import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApoderadoIntranetComponent } from './apoderado-intranet.component';

describe('ApoderadoIntranetComponent', () => {
  let component: ApoderadoIntranetComponent;
  let fixture: ComponentFixture<ApoderadoIntranetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApoderadoIntranetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApoderadoIntranetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
