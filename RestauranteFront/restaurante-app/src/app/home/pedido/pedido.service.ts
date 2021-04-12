import { ExcluirModel } from './models/excluirModel';
import { Observable } from 'rxjs';
import { RealizadaModel } from './models/realizadaModel';
import { BehaviorSubject } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { ListarModel } from './models/listarModel';
import { RealizarModel } from './models/realizarModel';
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
const baseUrl = `${environment.apiUrl}/pedido`

@Injectable()

export class PedidoService {
    
    public pedido: ListarModel;
    private _pedidos = new BehaviorSubject<ListarModel[]>([]);
    public readonly pedidos$: Observable<ListarModel[]> = this._pedidos.asObservable();

    constructor(private http: HttpClient) {
    }

    listarPedidos(comandaId: number){
        return this.http
        .get<ListarModel[]>(`${baseUrl}/${comandaId}`)
        .pipe(
            take(1)
        ).subscribe(res =>
            this._pedidos.next(res));
    }


    realizarPedido(model: RealizarModel){

        return this.http
        .post<number>(`${baseUrl}`, model)
        .pipe(
            take(1),
            catchError((error: HttpErrorResponse) => {
                throw error;
            })
        ).subscribe(id => {
           let pedidos = this._pedidos.getValue();
           pedidos.push(this.pedido)
           this._pedidos.next(pedidos.slice());

        })
             
    }

    editarPedido(model: RealizadaModel){
       this.http
        .put<ListarModel>(`${baseUrl}/editar`, model)
        .pipe(
            take(1),
            catchError((error: HttpErrorResponse) => {
                throw error;
            })
        ).subscribe( p => {
            let pedidos = this._pedidos.getValue().map(n => n.pedidoId === model.pedidoId ? {...n, pedidoValor: p.pedidoValor, quantidadeProduto: p.quantidadeProduto } : n)
            this._pedidos.next(pedidos);
        })


    }

    excluirPedido(model: ExcluirModel){
        this.http.delete<ListarModel>(`${baseUrl}/${model.pedidoId}/${model.comandaId}/cancelar`)
        .pipe(
            take(1),
             catchError((error: HttpErrorResponse) => {
                throw error;
            }))
            .subscribe(p => {
            let pedidos = this._pedidos.getValue().map(n => n.pedidoId === model.pedidoId? {...n, statusEnum: p.statusEnum} : n)
            this._pedidos.next(pedidos);
        })

    }
}
