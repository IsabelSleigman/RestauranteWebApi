import { HomeService } from './home.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ExcluirPedidoComponent } from '../dialogs/excluir-pedido/excluir-pedido.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
     private route: ActivatedRoute,
     private homeService: HomeService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.route.params.subscribe((params:Params) => {
     this.homeService.comandaId = +params['comandaId']
      console.log('Parametros ', params)
  });

  }

  navegarCardapio(){
    this.router.navigate(["home", this.homeService.comandaId]);
  }
  

  fecharComanda(){
    let dialogRef = this.dialog.open(ExcluirPedidoComponent, {
      data: { title: "Finalizar Comanda", msg: 'Tem ceteza que deseja finalizar Atendimento?' }
    });

    dialogRef.afterClosed()
      .pipe(
        filter(
          res => res == true))
      .subscribe(() => {
        this.homeService.fecharComanda();
        this.router.navigate([""]);
      });
  }
}
