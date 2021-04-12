import { PedidoService } from './pedido.service';
import { ListarModel } from './models/listarModel';
import { CardapioService } from './../cardapio/cadapio.service';
import { HomeService } from './../home.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ListarDisponivelModel } from '../cardapio/models/listarDisponivelModel';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']

})
export class PedidoComponent implements OnInit {

  pedidos: ListarModel[] = {} as ListarModel[]

  colunas = ['pedidoId', 'produtoNome', 'quantidadeProduto', 'valor', 'status','editar', 'excluir'];


  constructor(private homeService: HomeService, private pedidoService: PedidoService) {


  }

  ngOnInit(): void {

    this.pedidoService.listarPedidos(this.homeService.comandaId);

    this.pedidoService.pedidos$.subscribe(p => this.pedidos = p)
    console.log("pedidosListaPedidos", this.pedidos);
  }

  confirmarPedido() {

  }


}
