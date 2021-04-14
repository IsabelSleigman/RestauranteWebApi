import { PedidoDialogComponent } from './../../dialogs/pedido-dialog/pedido-dialog.component';
import { PedidoService } from './../pedido/pedido.service';
import { CardapioService } from './cadapio.service';
import { Component, OnInit } from '@angular/core';
import { ListarDisponivelModel } from './models/listarDisponivelModel';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.scss']
})
export class CardapioComponent implements OnInit {

 produto : ListarDisponivelModel[];

  constructor(private cardapioService: CardapioService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.cardapioService
    .listarProduto()
    .subscribe(p => this.produto = p);
    console.log(this.produto)
  }

  produtoSelecionado(produto : ListarDisponivelModel){
    this.dialog.open(PedidoDialogComponent, {
      width: '250px',
      data: produto
    });
  }
 
}
