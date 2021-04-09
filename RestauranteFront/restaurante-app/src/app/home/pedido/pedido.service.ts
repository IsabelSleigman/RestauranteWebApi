import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { ListarModel } from './models/listarModel';
import { RealizarModel } from './models/realizarModel';
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()

export class PedidoService {

    baseUrl = `${environment.apiUrl}/pedido`

    
    public pedido: ListarModel;
    private _pedidos = new BehaviorSubject<ListarModel[]>([]);
    public readonly pedidos$: Observable<ListarModel[]> = this._pedidos.asObservable();

    constructor(private http: HttpClient) {
    }

    listarPedidos(comandaId: number){
        return this.http
        .get<ListarModel[]>(`${this.baseUrl}/${comandaId}`)
        .pipe(
            take(1)
        ).subscribe(res =>
            this._pedidos.next(res));
    }


    realizarPedido(model: RealizarModel[]){

        return this.http
        .post<number>(`${this.baseUrl}`, model)
        .pipe(
            take(1)
        ).subscribe(id => {
           this.pedido.pedidoId = id;
           let pedidos = this._pedidos.getValue();
           pedidos.push(this.pedido)
           this._pedidos.next(pedidos.slice());

        })
             

    }

}