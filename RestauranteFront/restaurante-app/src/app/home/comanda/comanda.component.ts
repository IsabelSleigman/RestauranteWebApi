import { ListarModel } from './../pedido/models/listarModel';
import { PedidoService } from './../pedido/pedido.service';
import { HomeService } from 'src/app/home/home.service';
import { ComandaService } from './comanda.service';
import { BuscarModel } from './models/buscar-model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ModelCompleta } from './models/modelCompleta';


@Component({
  selector: 'app-comanda',
  templateUrl: './comanda.component.html',
  styleUrls: ['./comanda.component.scss']
})
export class ComandaComponent implements OnInit {

  matDataSource = new MatTableDataSource<ListarModel>();

  comandaCompleta: ModelCompleta = {} as ModelCompleta;

  pedidos: ListarModel[] = {} as ListarModel[]

  colunas = ['pedidoId', 'produtoNome', 'quantidade', 'valor', 'status'];

  constructor(
    private homeService: HomeService,
    private pedidoService: PedidoService) {
  }

  ngOnInit(): void {

    this.homeService.obterComanda()

    this.homeService.comanda$.subscribe(c => this.comandaCompleta = c);

   this.pedidoService.listarPedidos(this.comandaCompleta.comandaId);

   this.pedidoService.pedidos$.subscribe(p => this.pedidos = p)

  }

  FinalizarComanda(){

  }

}
