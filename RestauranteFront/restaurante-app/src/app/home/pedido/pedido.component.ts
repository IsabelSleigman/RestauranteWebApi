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

  formPedido : FormGroup;
  produto: number;
  quantidade: number;
  comanda : number;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {

    this.comanda = this.homeService.comandaId;
    console.log('pedido', this.comanda);

    this.formPedido= new FormGroup({
      comanda: new FormControl('', [Validators.required]),
      produtoId: new FormControl('', [Validators.required]),
      quantidade: new FormControl('', [Validators.required])
    });

  }

  confirmarPedido(){

  }

  produtoSelecionado(produtoId: number)
  {
    
  }
}
