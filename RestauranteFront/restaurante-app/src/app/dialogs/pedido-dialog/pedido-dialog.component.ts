import { NotificationService } from './../../shared/snackbar/notification.service';
import { RealizarModel } from './../../home/pedido/models/realizarModel';
import { PedidoService } from './../../home/pedido/pedido.service';
import { ListarDisponivelModel } from './../../home/cardapio/models/listarDisponivelModel';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pedido-dialog',
  templateUrl: './pedido-dialog.component.html',
  styleUrls: ['./pedido-dialog.component.scss']
})
export class PedidoDialogComponent implements OnInit {

  formPedido: FormGroup;

  produto : ListarDisponivelModel = {} as ListarDisponivelModel;

  pedido : RealizarModel = {} as RealizarModel;

  quantidadeSelt: [1,2,3,4,5,6,7];

  constructor(public dialogRef: MatDialogRef<PedidoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ListarDisponivelModel
    ,private pedidoService: PedidoService,private notificationService: NotificationService) {
      this.produto = data;
    }

  ngOnInit(): void {

    this.formPedido = new FormGroup({
      produtoId: new FormControl(this.produto.produtoId, [Validators.required]),
      quantidade: new FormControl(1, [Validators.required]),
    
    });
  }

  cancelar() {
    this.dialogRef.close();
  }

  realizarPedido(){
    var pedido: RealizarModel = {
      produtoId: this.formPedido.value.produtoId,
      quantidade: this.formPedido.value.quantidade,
    }
    if(pedido != null){
      this.pedidoService.realizarPedido(pedido);
      this.dialogRef.close();
    }

  }
}
