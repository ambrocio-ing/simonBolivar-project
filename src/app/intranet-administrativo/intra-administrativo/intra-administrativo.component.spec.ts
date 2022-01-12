import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntraAdministrativoComponent } from './intra-administrativo.component';

describe('IntraAdministrativoComponent', () => {
  let component: IntraAdministrativoComponent;
  let fixture: ComponentFixture<IntraAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntraAdministrativoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntraAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
