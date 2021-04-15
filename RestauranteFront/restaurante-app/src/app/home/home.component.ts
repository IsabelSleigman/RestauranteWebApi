import { DailogConfirmacaoComponent } from './../dialogs/dailog-confirmacao/dailog-confirmacao.component';
import { HomeService } from './home.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  comandaId: number = 0;

  constructor(private router: Router,
     private route: ActivatedRoute,
     private homeService: HomeService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.route.params
    .pipe(
      take(1))
      .subscribe((params:Params) => {
     this.comandaId = +params['comandaId']
      console.log('Parametros ', params)
      this.homeService.carregarComanda(this.comandaId);
  });

  }

  navegarCardapio(){
    this.router.navigate(["home", this.comandaId]);
    console.log("Navegar", this.comandaId)
  }
  

  fecharComanda(){
    let dialogRef = this.dialog.open(DailogConfirmacaoComponent, {
      data: { title: "Finalizar Comanda", msg: 'Tem ceteza que deseja finalizar Atendimento?' }
    });

    dialogRef.afterClosed()
      .pipe(
        filter(
          res => res == true))
      .subscribe(() => {
        this.homeService.fecharComanda();
        this.router.navigate(["fechar"]);
      });
  }
}
