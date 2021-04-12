import { ExcluirModel } from './../pedido/models/excluirModel';
import { EditarPedidoComponent } from './../../dialogs/editar-pedido/editar-pedido.component';
import { ListarModel } from './../pedido/models/listarModel';
import { PedidoService } from './../pedido/pedido.service';
import { HomeService } from 'src/app/home/home.service';
import { BuscarModel } from './models/buscar-model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ModelCompleta } from './models/modelCompleta';
import { MatDialog } from '@angular/material/dialog';
import { ExcluirPedidoComponent } from 'src/app/dialogs/excluir-pedido/excluir-pedido.component';
import { filter, take } from 'rxjs/operators';
import { pipe } from 'rxjs';


@Component({
  selector: 'app-comanda',
  templateUrl: './comanda.component.html',
  styleUrls: ['./comanda.component.scss']
})
export class ComandaComponent implements OnInit {

  comandaCompleta: ModelCompleta = {} as ModelCompleta;

  pedidos: ListarModel[] = {} as ListarModel[]

  colunas = ['pedidoId', 'produtoNome', 'quantidadeProduto', 'valor', 'status', 'editar', 'excluir'];

  constructor(
    private homeService: HomeService,
    private pedidoService: PedidoService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.homeService.obterComanda()

    this.homeService.comanda$.subscribe(c => this.comandaCompleta = c);

    this.pedidoService.listarPedidos(this.homeService.comandaId);


    this.pedidoService.pedidos$.subscribe(p => this.pedidos = p)
    console.log("ComandaListaPedidos", this.pedidos);

  }

  editarSelecionado(pedido: ListarModel) {
    this.dialog.open(EditarPedidoComponent, {
      data: pedido
    });
  }

  excluirPedido(pedido: ListarModel) {
    let pedidoId = pedido.pedidoId;
    let comandaId = this.homeService.comandaId;
    let p : ExcluirModel = {pedidoId,comandaId}
console.log(p);
    let dialogRef = this.dialog.open(ExcluirPedidoComponent, {
      data: { title: "Aviso", msg: 'Tem ceteza que deseja excluir esse Pedido?' }
    });

    dialogRef.afterClosed()
      .pipe(
        filter(
          res => res == true))
      .subscribe(() => {
        this.pedidoService.excluirPedido(p);
      });
  }

}
