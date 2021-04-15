import { HomeService } from 'src/app/home/home.service';
import { Router } from '@angular/router';
import { ModelCompleta } from './../../home/comanda/models/modelCompleta';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-fechar-comanda',
  templateUrl: './fechar-comanda.component.html',
  styleUrls: ['./fechar-comanda.component.scss']
})
export class FecharComandaComponent implements OnInit {

  panelOpenState = false;
  
  comandaCompleta : ModelCompleta;

  constructor(public dialogRef: MatDialogRef<FecharComandaComponent>,
     private router: Router, private homeService: HomeService) {
    }

  ngOnInit(): void {

    this.homeService.atualizarComanda()

    this.homeService.comanda$
      .pipe(
        take(1))
      .subscribe(c => this.comandaCompleta = c);

  }

  menuInicial(){
    this.router.navigate([""])
  }

}
