import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergenteApoderadoComponent } from './emergente-apoderado.component';

describe('EmergenteApoderadoComponent', () => {
  let component: EmergenteApoderadoComponent;
  let fixture: ComponentFixture<EmergenteApoderadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmergenteApoderadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergenteApoderadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
