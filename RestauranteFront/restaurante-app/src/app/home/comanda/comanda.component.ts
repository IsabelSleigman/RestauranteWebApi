import { ComandaService } from './comanda.service';
import { IniciadaModel } from './models/iniciada-model';
import { HomeService } from './../home.service';
import { BuscarModel } from './models/buscar-model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-comanda',
  templateUrl: './comanda.component.html',
  styleUrls: ['./comanda.component.scss']
})
export class ComandaComponent implements OnInit {

  comanda: BuscarModel;

  constructor(private router:Router,
    private route: ActivatedRoute,
    private homeService: HomeService,
    private comandaService : ComandaService) {
     }

  ngOnInit(): void {

    this.homeService
    .obterComanda(this.homeService.comandaId)
    .subscribe(c => this.comanda = c)
  }

  FinalizarComanda(){

  }

}
