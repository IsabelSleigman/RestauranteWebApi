import { HomeService } from 'src/app/home/home.service';
import { ComandaService } from './comanda.service';
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

    this.comandaService
    .obterComanda(this.homeService.comandaId)
    .subscribe(c => this.comanda = c)
  }

  FinalizarComanda(){

  }

}
