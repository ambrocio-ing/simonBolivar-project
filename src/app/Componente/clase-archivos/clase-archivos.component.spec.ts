import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaseArchivosComponent } from './clase-archivos.component';

describe('ClaseArchivosComponent', () => {
  let component: ClaseArchivosComponent;
  let fixture: ComponentFixture<ClaseArchivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaseArchivosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaseArchivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
