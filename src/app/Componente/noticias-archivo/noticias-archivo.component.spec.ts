import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiasArchivoComponent } from './noticias-archivo.component';

describe('NoticiasArchivoComponent', () => {
  let component: NoticiasArchivoComponent;
  let fixture: ComponentFixture<NoticiasArchivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticiasArchivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticiasArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
