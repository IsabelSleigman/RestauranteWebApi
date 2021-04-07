import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({ providedIn: 'root' })

export class ComandaService {

    comandaId : number;

    constructor(private route: ActivatedRoute
        ) { }

pegarComandaId(){
    return this.route.params.subscribe((params) => {
        this.comandaId = +params['comandaId'];
      });
    }

}