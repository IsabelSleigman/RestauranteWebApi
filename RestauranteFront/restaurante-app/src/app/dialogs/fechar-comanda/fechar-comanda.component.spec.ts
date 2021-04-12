import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FecharComandaComponent } from './fechar-comanda.component';

describe('FecharComandaComponent', () => {
  let component: FecharComandaComponent;
  let fixture: ComponentFixture<FecharComandaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FecharComandaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FecharComandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
