import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbertasFaturamento } from '../../models/abertasFaturamento';

@Component({
  selector: 'app-comanda-dialog',
  templateUrl: './comanda-dialog.component.html',
  styleUrls: ['./comanda-dialog.component.scss']
})
export class ComandaDialogComponent implements OnInit {

  panelOpenState = false;
  
  comanda : AbertasFaturamento;

  constructor(public dialogRef: MatDialogRef<ComandaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AbertasFaturamento) {
      this.comanda = data;
    }
  ngOnInit(): void {

  }

}
