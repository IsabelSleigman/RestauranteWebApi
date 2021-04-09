import { CardapioService } from './../cardapio/cadapio.service';
import { HomeService } from './../home.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ListarDisponivelModel } from '../cardapio/models/listarDisponivelModel';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']

})
export class PedidoComponent implements OnInit {

  formPedido: FormGroup;
  produtoId: number = 0;
  
  comanda: number = 0;
  produto: ListarDisponivelModel;

  constructor(private homeService: HomeService, private cardapioService: CardapioService) {

    this.comanda = this.homeService.comandaId;

  }

  ngOnInit(): void {
   

    this.formPedido = new FormGroup({
      comanda: new FormControl('', [Validators.required]),
      produtoId: new FormControl('', [Validators.required]),
      quantidade: new FormControl('', [Validators.required])
    });

  }

  confirmarPedido() {

  }

  produtoSelecionado(produtoId: number) {

  }
}
