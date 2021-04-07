import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nao-encontrada',
  templateUrl: './nao-encontrada.component.html',
  styleUrls: ['./nao-encontrada.component.scss']
})
export class NaoEncontradaComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  voltarInicial(){
    this.router.navigate([''])
  }

}
