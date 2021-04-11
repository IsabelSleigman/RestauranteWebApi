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

  FinalizarComanda(){

  }

}
