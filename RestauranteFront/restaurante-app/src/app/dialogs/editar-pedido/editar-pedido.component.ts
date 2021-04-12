import { ListarModel } from './../../home/pedido/models/listarModel';
import { HomeService } from 'src/app/home/home.service';
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
    @Inject(MAT_DIALOG_DATA) public data: ListarModel, private homeService: HomeService
  ) {
    this.pedido = data;
  }


  ngOnInit(): void {

    console.log("Pedido", this.homeService.comandaId);

    this.formEditar = new FormGroup({
      pedidoId: new FormControl(null),
      comandaId: new FormControl(null),
      quantidade: new FormControl(1, [Validators.required])
    });
  }

  cancelar() {
    this.dialogRef.close();
  }

  editarPedido() {
    var pedido: RealizadaModel = {
      pedidoId: this.pedido.pedidoId,
      comandaId: this.homeService.comandaId,
      quantidade: this.formEditar.get('quantidade').value
    }
    this.pedidoService.editarPedido(pedido);

    this.dialogRef.close();
    console.log(pedido);
    console.log("Editar", this.homeService.comandaId);

  }

}


