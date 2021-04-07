import { HomeService } from './../home/home.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InicialService } from './inicial.service';
import { MesaModel } from './models/mesa-model';

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.scss']
})
export class InicialComponent implements OnInit {
  public form: FormGroup;
  
  quantidadePessoa = [1,2,3,4]
  public mesas: MesaModel[];

  constructor(private router:Router,private inicialService: InicialService, private homeService: HomeService) { }
  
  @Output() inicialForm = new EventEmitter<void>();

  ngOnInit(): void {
    this.inicialService.obterMesas().subscribe(m => this.mesas = m);

    this.form = new FormGroup({
      mesaId: new FormControl('', [Validators.required]),
      quantidadeClientes: new FormControl('', [Validators.required])
    });

  }


  navegarMenu(){
    if(this.form.valid){
      this.homeService.iniciar(this.form.value).subscribe(c => {
        this.router.navigate(['home', c.comandaId]);
        
      });
    }
   
  }

}
