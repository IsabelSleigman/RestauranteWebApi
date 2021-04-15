import { ComandaDialogfechadaComponent } from '../dialogs/fechadaDialog/comanda-dialogfechada.component';
import { take } from 'rxjs/operators';
import { FechadasFaturamento } from './../models/fechadasFaturamento';
import { Component, OnInit } from '@angular/core';
import { FaturamentoService } from '../faturamento.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-atendimentos-fechados',
  templateUrl: './atendimentos-fechados.component.html',
  styleUrls: ['./atendimentos-fechados.component.scss']
})
export class AtendimentosFechadosComponent implements OnInit {

  fechadas: FechadasFaturamento[] = [];

  colunas = ['comandaId', 'dataEntrada', 'dataSaida', 'quantidadePedidos', 'quantidadeClientes', 'valor', 'abrir'];

  constructor(private faturamentoService: FaturamentoService
    , public dialog: MatDialog) { }

  ngOnInit(): void {

    this.faturamentoService
      .obterFechadas()
      .pipe(
        take(1))
      .subscribe(f => this.fechadas = f);
  }

  abrirComanda(comanda: FechadasFaturamento) {
    this.dialog.open(ComandaDialogfechadaComponent, {
      data: comanda
    });

  }
}
