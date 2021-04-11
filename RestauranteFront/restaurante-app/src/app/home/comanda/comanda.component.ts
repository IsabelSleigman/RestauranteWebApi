import { ListarModel } from './../pedido/models/listarModel';
import { ModelCompleta } from './models/modelCompleta';
import { ComandaService } from './comanda.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-comanda',
  templateUrl: './comanda.component.html',
  styleUrls: ['./comanda.component.scss']
})
export class ComandaComponent implements OnInit {

  matDataSource = new MatTableDataSource<ModelCompleta>();

  comandaCompleta: ModelCompleta = {} as ModelCompleta;

  colunas = ['pedidoId', 'produtoNome', 'quantidade', 'valor', 'status'];

  constructor(
    private comandaService: ComandaService) {
  }

  ngOnInit(): void {

    this.comandaService.obterComanda();

    this.comandaService.comanda$.subscribe(c => this.comandaCompleta = c);

  }


  

  FinalizarComanda() {

  }

}
