import { take } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FaturamentoService } from '../../faturamento.service';
import { TotalFaturamento } from '../../models/totalFaturamento';

@Component({
  selector: 'app-relatorio-total',
  templateUrl: './relatorio-total.component.html',
  styleUrls: ['./relatorio-total.component.scss']
})
export class RelatorioTotalComponent implements OnInit {

  relatorio : TotalFaturamento = {} as TotalFaturamento;

  constructor(public dialogRef: MatDialogRef<RelatorioTotalComponent>,
    private faturamentoService:FaturamentoService) {}

  ngOnInit(): void {

    this.faturamentoService.obterRelatorio()
    .pipe(
      take(1))
    .subscribe(f => this.relatorio = f);
  }
}
