import { HomeService } from './home.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
     private route: ActivatedRoute,
     private homeService: HomeService) { }

  ngOnInit(): void {


  }

  navegarCardapio(){
    this.router.navigate(["cardapio"], { relativeTo: this.route });
  }
  navegarComanda(){
    this.router.navigate(["comanda"], { relativeTo: this.route });
  }
  navegarPedido(){
    this.router.navigate(["home", this.homeService.comandaId]);
  }

}
