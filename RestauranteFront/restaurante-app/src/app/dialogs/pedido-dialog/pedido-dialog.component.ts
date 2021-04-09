import { RealizarModel } from './../../home/pedido/models/realizarModel';
import { ListarModel } from './../../home/pedido/models/listarModel';
import { PedidoService } from './../../home/pedido/pedido.service';
import { HomeService } from './../../home/home.service';
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

  pedido : RealizarModel[] = {} as RealizarModel[];

  quantidadeSelt: [1,2,3,4,5,6,7];

  comanda : number = 0;

  constructor(public dialogRef: MatDialogRef<PedidoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ListarDisponivelModel, private homeService:HomeService,private pedidoService: PedidoService) {
      this.produto = data;
    }

  ngOnInit(): void {
    
    this.comanda = this.homeService.comandaId;

    this.formPedido = new FormGroup({
      comandaId: new FormControl(this.comanda, [Validators.required]),
      produtoId: new FormControl(this.produto.produtoId, [Validators.required]),
      quantidade: new FormControl(1, [Validators.required])
    });
  }

  cancelar() {
    this.dialogRef.close();
  }

  realizarPedido(){
    this.pedido = this.formPedido.value
    this.pedidoService.realizarPedido(this.pedido)
    this.dialogRef.close();

  }

}
