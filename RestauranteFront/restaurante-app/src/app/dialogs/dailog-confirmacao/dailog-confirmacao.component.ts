import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Data } from '@angular/router';

@Component({
  selector: 'app-dailog-confirmacao',
  templateUrl: './dailog-confirmacao.component.html',
  styleUrls: ['./dailog-confirmacao.component.scss']
})
export class DailogConfirmacaoComponent {

  constructor(public dialogRef: MatDialogRef<DailogConfirmacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data) {}

    confirmar(){
      this.dialogRef.close(true)
    }

}