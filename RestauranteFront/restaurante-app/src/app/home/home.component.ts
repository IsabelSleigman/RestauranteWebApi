import { DailogConfirmacaoComponent } from './../dialogs/dailog-confirmacao/dailog-confirmacao.component';
import { HomeService } from './home.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
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
    let comandaId : number = 0;
    comandaId = this.homeService.obterComandaId()
    this.router.navigate(["home", this.homeService.comandaId]);
    console.log("Teste", comandaId)
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
        this.router.navigate([""]);
      });
  }
}
