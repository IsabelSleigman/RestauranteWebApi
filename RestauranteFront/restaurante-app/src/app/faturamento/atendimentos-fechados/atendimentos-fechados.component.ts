import { ComandaDialogfechadaComponent } from '../dialogs/fechadaDialog/comanda-dialogfechada.component';
import { takeUntil } from 'rxjs/operators';
import { FechadasFaturamento } from './../models/fechadasFaturamento';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FaturamentoService } from '../faturamento.service';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-atendimentos-fechados',
  templateUrl: './atendimentos-fechados.component.html',
  styleUrls: ['./atendimentos-fechados.component.scss']
})
export class AtendimentosFechadosComponent implements OnInit, OnDestroy {

  fechadas: FechadasFaturamento[] = [];

  colunas = ['comandaId', 'dataEntrada', 'dataSaida', 'quantidadePedidos', 'quantidadeClientes', 'valor','paga', 'abrir'];

  unsub$ = new Subject();

  constructor(private faturamentoService: FaturamentoService
    , public dialog: MatDialog) { }

  ngOnInit(): void {

    this.faturamentoService
      .obterFechadas()
      .pipe(
        takeUntil(this.unsub$))
      .subscribe(f => this.fechadas = f);
  }

  abrirComanda(comanda: FechadasFaturamento) {
    this.dialog.open(ComandaDialogfechadaComponent, {
      data: comanda
    });

  }

  public ngOnDestroy() {

    this.unsub$.next();
    this.unsub$.complete();

  }
}
