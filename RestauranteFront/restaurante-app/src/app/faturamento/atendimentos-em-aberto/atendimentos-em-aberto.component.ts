import { ComandaDialogComponent } from './../dialogs/comanda-dialog/comanda-dialog.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take, takeUntil } from 'rxjs/operators';
import { FaturamentoService } from '../faturamento.service';
import { AbertasFaturamento } from '../models/abertasFaturamento';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-atendimentos-em-aberto',
  templateUrl: './atendimentos-em-aberto.component.html',
  styleUrls: ['./atendimentos-em-aberto.component.scss']
})
export class AtendimentosEmAbertoComponent implements OnInit, OnDestroy {

 comandasAbertas: AbertasFaturamento[] = [];

 colunas = ['comandaId', 'mesaId', 'dataHora', 'quantidadePedidos', 'quantidadeClientes', 'valor', 'abrir'];

 unsub$ = new Subject();

  constructor(private faturamentoService: FaturamentoService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.faturamentoService.obterAbertas()
    .pipe(
      takeUntil(this.unsub$))
    .subscribe(a =>this.comandasAbertas = a);
  }

  abrirComanda(comanda: AbertasFaturamento){
      this.dialog.open(ComandaDialogComponent, {
        data: comanda
      });
    
  }

  public ngOnDestroy() {

    this.unsub$.next();
    this.unsub$.complete();

  }

}
