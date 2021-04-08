import { PedidoService } from './../pedido/pedido.service';
import { CardapioService } from './cadapio.service';
import { Component, OnInit } from '@angular/core';
import { ListarDisponivelModel } from './models/listarDisponivelModel';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.scss']
})
export class CardapioComponent implements OnInit {

 produto : ListarDisponivelModel[];
 produtoId: number;

  constructor(private cardapioService: CardapioService, private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.cardapioService
    .listarProduto()
    .subscribe(p => this.produto = p);
    console.log(this.produto)
  }

  produtoSelecionado(){
    this.pedidoService.pegarIdProduto(this.produtoId);
  }
 
}
