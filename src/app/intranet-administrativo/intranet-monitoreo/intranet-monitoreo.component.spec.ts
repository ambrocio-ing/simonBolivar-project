import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntranetMonitoreoComponent } from './intranet-monitoreo.component';

describe('IntranetMonitoreoComponent', () => {
  let component: IntranetMonitoreoComponent;
  let fixture: ComponentFixture<IntranetMonitoreoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntranetMonitoreoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntranetMonitoreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
