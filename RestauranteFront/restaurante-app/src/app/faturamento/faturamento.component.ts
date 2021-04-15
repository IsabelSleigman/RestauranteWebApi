import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { FaturamentoService } from './faturamento.service';
import { AbertasFaturamento } from './models/abertasFaturamento';

@Component({
  selector: 'app-faturamento',
  templateUrl: './faturamento.component.html',
  styleUrls: ['./faturamento.component.scss']
})
export class FaturamentoComponent implements OnInit {

 comandasAbertas: AbertasFaturamento[];

  constructor(private faturamentoService: FaturamentoService) { }

  ngOnInit(): void {

    this.faturamentoService.obterAbertas()
    .pipe(
      take(1))
    .subscribe(a =>this.comandasAbertas = a);
  }

}
