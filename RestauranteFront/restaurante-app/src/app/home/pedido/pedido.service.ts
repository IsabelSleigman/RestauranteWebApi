import { RealizarModel } from './models/realizarModel';
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()

export class PedidoService {

    public comandaId: number;

    baseUrl = `${environment.apiUrl}/pedido`

    constructor(private http: HttpClient,
        private router: Router,
        private route: ActivatedRoute) { }

        
    
}