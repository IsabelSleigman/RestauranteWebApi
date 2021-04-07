import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comanda-iniciada',
  templateUrl: './comanda-iniciada.component.html',
  styleUrls: ['./comanda-iniciada.component.scss']
})
export class ComandaIniciadaComponent implements OnInit {

  comandaId: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.comandaId = +params['comandaId'];
    });
  }

}
