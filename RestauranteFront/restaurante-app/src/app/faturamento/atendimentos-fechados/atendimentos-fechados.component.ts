import { take } from 'rxjs/operators';
import { FechadasFaturamento } from './../models/fechadasFaturamento';
import { Component, OnInit } from '@angular/core';
import { FaturamentoService } from '../faturamento.service';

@Component({
  selector: 'app-atendimentos-fechados',
  templateUrl: './atendimentos-fechados.component.html',
  styleUrls: ['./atendimentos-fechados.component.scss']
})
export class AtendimentosFechadosComponent implements OnInit {

  fechadas: FechadasFaturamento[];

  colunas = ['comandaId', 'dataEntrada', 'dataSaida', 'quantidadePedidos', 'quantidadeClientes', 'valor', 'abrir'];

  constructor(private faturamentoService: FaturamentoService) { }

  ngOnInit(): void {

    this.faturamentoService
    .obterFechadas()
    .pipe(
      take(1))
      .subscribe(f => this.fechadas = f);
  }

}
