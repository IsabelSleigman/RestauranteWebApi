import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FechadasFaturamento } from '../../models/fechadasFaturamento';

@Component({
  selector: 'app-comanda-dialogfechada',
  templateUrl: './comanda-dialogfechada.component.html',
  styleUrls: ['./comanda-dialogfechada.component.scss']
})
export class ComandaDialogfechadaComponent implements OnInit {

  panelOpenState = false;
  
  comanda : FechadasFaturamento;

  constructor(public dialogRef: MatDialogRef<ComandaDialogfechadaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FechadasFaturamento) {
      this.comanda = data;
    }

  ngOnInit(): void {
  }

}
