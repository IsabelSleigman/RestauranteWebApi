import { ExcluirModel } from './../pedido/models/excluirModel';
import { EditarPedidoComponent } from './../../dialogs/editar-pedido/editar-pedido.component';
import { ListarModel } from './../pedido/models/listarModel';
import { PedidoService } from './../pedido/pedido.service';
import { HomeService } from 'src/app/home/home.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModelCompleta } from './models/modelCompleta';
import { MatDialog } from '@angular/material/dialog';
import { filter, takeUntil } from 'rxjs/operators';
import { DailogConfirmacaoComponent } from 'src/app/dialogs/dailog-confirmacao/dailog-confirmacao.component';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-comanda',
  templateUrl: './comanda.component.html',
  styleUrls: ['./comanda.component.scss']
})
export class ComandaComponent implements OnInit, OnDestroy {

  comandaCompleta: ModelCompleta = {} as ModelCompleta;

  pedidos: ListarModel[] = {} as ListarModel[]

  colunas = ['editar', 'excluir', 'pedidoId', 'produtoNome', 'quantidadeProduto', 'valor', 'status'];

  unsub$ = new Subject();

  constructor(
    private homeService: HomeService,
    private pedidoService: PedidoService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.homeService.atualizarComanda()

    this.homeService.comanda$
      .pipe(
        takeUntil(this.unsub$))
      .subscribe(c => this.comandaCompleta = c);

    this.pedidoService.listarPedidos();

    this.pedidoService.pedidos$
      .pipe(
        takeUntil(this.unsub$))
      .subscribe(p => this.pedidos = p);

  }

  editarSelecionado(pedido: ListarModel) {
    this.dialog.open(EditarPedidoComponent, {
      data: pedido
    });
  }

  excluirPedido(pedido: ListarModel) {

    let p: ExcluirModel = { pedidoId: pedido.pedidoId }

    let dialogRef = this.dialog.open(DailogConfirmacaoComponent, {
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

  public ngOnDestroy() {

    this.unsub$.next();
    this.unsub$.complete();

  }

}
