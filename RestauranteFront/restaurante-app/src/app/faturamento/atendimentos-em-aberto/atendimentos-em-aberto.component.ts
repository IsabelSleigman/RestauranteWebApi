import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { FaturamentoService } from '../faturamento.service';
import { AbertasFaturamento } from '../models/abertasFaturamento';

@Component({
  selector: 'app-atendimentos-em-aberto',
  templateUrl: './atendimentos-em-aberto.component.html',
  styleUrls: ['./atendimentos-em-aberto.component.scss']
})
export class AtendimentosEmAbertoComponent implements OnInit {

 comandasAbertas: AbertasFaturamento[];

 colunas = ['comandaId', 'mesaId', 'dataHora', 'quantidadePedidos', 'quantidadeClientes', 'valor', 'abrir'];


  constructor(private faturamentoService: FaturamentoService) { }

  ngOnInit(): void {

    this.faturamentoService.obterAbertas()
    .pipe(
      take(1))
    .subscribe(a =>this.comandasAbertas = a);
  }


  abrirComanda(comanda: AbertasFaturamento){

  }

  CancelarComanda(){

  }

}
