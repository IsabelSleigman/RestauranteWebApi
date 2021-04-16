import { TotalFaturamento } from './../models/totalFaturamento';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relatorio-total',
  templateUrl: './relatorio-total.component.html',
  styleUrls: ['./relatorio-total.component.scss']
})
export class RelatorioTotalComponent implements OnInit {

  relatorio : TotalFaturamento = {} as TotalFaturamento;

  colunas = ['atendimento', 'clientes', 'valor'];

  constructor() { }

  ngOnInit(): void {
  }

}
