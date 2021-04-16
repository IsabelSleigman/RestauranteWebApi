import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RelatorioTotalComponent } from './dialogs/relatorio-total/relatorio-total.component';

@Component({
  selector: 'app-faturamento',
  templateUrl: './faturamento.component.html',
  styleUrls: ['./faturamento.component.scss']
})
export class FaturamentoComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  abrirRelatorio() {
    this.dialog.open(RelatorioTotalComponent);

  }

}
