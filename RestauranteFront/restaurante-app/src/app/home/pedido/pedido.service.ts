import { NotificationService } from './../../shared/snackbar/notification.service';
import { HomeService } from 'src/app/home/home.service';
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
const baseUrl = `${environment.apiUrl}/pedido`

@Injectable()

export class PedidoService {

    private pedido: ListarModel;
    private _pedidos = new BehaviorSubject<ListarModel[]>([]);
    public readonly pedidos$: Observable<ListarModel[]> = this._pedidos.asObservable();
    private comandaId: number = 0;

    constructor(private http: HttpClient,
        private homeService: HomeService,
        private notificationService: NotificationService) {
    }

    listarPedidos() {

        this.obterComandaId();

        return this.http
            .get<ListarModel[]>(`${baseUrl}/${this.comandaId}`)
            .pipe(
                take(1),
            ).subscribe(res =>
                this._pedidos.next(res));

    }

    realizarPedido(model: RealizarModel) {

        this.obterComandaId();

        return this.http
            .post<number>(`${baseUrl}`, {
                produtoId: model.produtoId,
                quantidade: model.quantidade,
                comandaId: this.comandaId
            })
            .pipe(
                take(1),
                catchError((error: HttpErrorResponse) => {
                    this.notificationService.errorMessage(error);
                    throw error;
                })
            ).subscribe(id => {
                let pedidos = this._pedidos.getValue();
                pedidos.push(this.pedido)
                this._pedidos.next(pedidos.slice());
                this.notificationService.successMessage('Pedido Realizado!')
                this.homeService.atualizarComanda();
            })

    }

    editarPedido(model: RealizadaModel) {

        this.http
            .put<ListarModel>(`${baseUrl}/editar`, {
                pedidoId: model.pedidoId,
                quantidade: model.quantidade,
                comandaId: this.comandaId
            })
            .pipe(
                take(1),
                catchError((error: HttpErrorResponse) => {
                    this.notificationService.errorMessage(error);
                    throw error;
                })
            ).subscribe(p => {
                let pedidos = this._pedidos.getValue().map(n => n.pedidoId === model.pedidoId ? { ...n, pedidoValor: p.pedidoValor, quantidadeProduto: p.quantidadeProduto } : n)
                this._pedidos.next(pedidos);
                this.notificationService.successMessage('Pedido Editado!')
                this.homeService.atualizarComanda();
            })

    }

    excluirPedido(model: ExcluirModel) {
        this.http.delete<ListarModel>(`${baseUrl}/${model.pedidoId}/${this.comandaId}/cancelar`)
            .pipe(
                take(1),
                catchError((error: HttpErrorResponse) => {
                    this.notificationService.errorMessage(error);
                    throw error;
                }))
            .subscribe(p => {
                let pedidos = this._pedidos.getValue().map(n => n.pedidoId === model.pedidoId ? { ...n, statusEnum: p.statusEnum } : n)
                this._pedidos.next(pedidos);
                this.notificationService.successMessage('Pedido excluido!')
                this.homeService.atualizarComanda();
            })

    }

    obterComandaId() {
        this.homeService.comanda$
            .pipe(
                take(1))
            .subscribe(c => this.comandaId = c.comandaId);

    }
}
