import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Data } from '@angular/router';
import { PedidoService } from 'src/app/home/pedido/pedido.service';

@Component({
  selector: 'app-excluir-pedido',
  templateUrl: './excluir-pedido.component.html',
  styleUrls: ['./excluir-pedido.component.scss']
})
export class ExcluirPedidoComponent {

  constructor(public dialogRef: MatDialogRef<ExcluirPedidoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data) {}

    confirmar(){
      this.dialogRef.close(true)
    }

}