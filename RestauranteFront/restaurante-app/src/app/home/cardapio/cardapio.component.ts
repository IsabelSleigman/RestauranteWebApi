import { PedidoDialogComponent } from './../../dialogs/pedido-dialog/pedido-dialog.component';
import { CardapioService } from './cadapio.service';
import { Component, OnInit } from '@angular/core';
import { ListarDisponivelModel } from './models/listarDisponivelModel';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.scss']
})
export class CardapioComponent implements OnInit {

  produto: ListarDisponivelModel[];

  constructor(private cardapioService: CardapioService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.cardapioService
      .listarProduto()
      .pipe(
        take(1))
      .subscribe(p => this.produto = p);
  }

  produtoSelecionado(produto: ListarDisponivelModel) {
    this.dialog.open(PedidoDialogComponent, {
      width: '400px',
      data: produto
    });
  }

}
