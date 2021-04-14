import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendimentosEmAbertoComponent } from './atendimentos-em-aberto.component';

describe('AtendimentosEmAbertoComponent', () => {
  let component: AtendimentosEmAbertoComponent;
  let fixture: ComponentFixture<AtendimentosEmAbertoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtendimentosEmAbertoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtendimentosEmAbertoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
