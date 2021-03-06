import { ListarModel } from './../../home/pedido/models/listarModel';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RealizadaModel } from 'src/app/home/pedido/models/realizadaModel';
import { PedidoService } from 'src/app/home/pedido/pedido.service';

@Component({
  selector: 'app-editar-pedido',
  templateUrl: './editar-pedido.component.html',
  styleUrls: ['./editar-pedido.component.scss']
})
export class EditarPedidoComponent implements OnInit {

  formEditar: FormGroup;

  pedido: ListarModel;

  constructor(
    private pedidoService: PedidoService,
    private dialogRef: MatDialogRef<EditarPedidoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ListarModel) {
    this.pedido = data;
  }


  ngOnInit(): void {

    this.formEditar = new FormGroup({
      pedidoId: new FormControl(null),
      quantidade: new FormControl(this.data.quantidadeProduto, [Validators.required])
    });
  }

  cancelar() {
    this.dialogRef.close();
  }

  editarPedido() {
    var pedido: RealizadaModel = {
      pedidoId: this.pedido.pedidoId,
      quantidade: this.formEditar.get('quantidade').value
    }
    if(pedido != null){

      this.pedidoService.editarPedido(pedido);
      this.dialogRef.close();
  
    }
  
  }

}


