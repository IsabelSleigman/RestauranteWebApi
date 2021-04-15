import { AberturaModel } from './../inicial/models/abertura-model';
import { Injectable } from "@angular/core";
import { catchError, take, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { NotificationService } from '../shared/snackbar/notification.service';
const baseUrl = `${environment.apiUrl}/faturamento`

@Injectable()

export class FaturamentoService {

    constructor(private http: HttpClient,
        private notificationService: NotificationService) {
    }

    iniciar(iniciar: AberturaModel): Observable<number> {

        return this.http
            .post<number>(`${baseUrl}`, iniciar)
            .pipe(
                take(1),
                tap(c => this.comandaId = c),
                catchError((error: HttpErrorResponse) => {
                    this.notificationService.errorMessage(error);
                    throw error;

                })

            )

    }

    atualizarComanda() {

        return this.http
            .get<ModelCompleta>(`${baseUrl}/${this.comandaId}`)
            .pipe(
                take(1),
                catchError((error: HttpErrorResponse) => {
                    this.notificationService.errorMessage(error);
                    throw error;
                })
            )
            .subscribe(res => this._comanda.next(res));
    }

    carregarComanda(comandaId: number) {
        
        return this.http
            .get<ModelCompleta>(`${baseUrl}/${comandaId}`)
            .pipe(
                take(1),
                tap(c => this.comandaId = c.comandaId),
                catchError((error: HttpErrorResponse) => {
                    this.notificationService.errorMessage(error);
                    throw error;
                })
            ).subscribe(res => this._comanda.next(res));
    }

    fecharComanda() {
        this.http
            .post(`${baseUrl}/${this.comandaId}/fechar`, this.comandaId)
            .pipe(
                take(1),
                catchError((error: HttpErrorResponse) => {
                    this.notificationService.errorMessage(error);
                    throw error;
                })
            ).subscribe(() => {this.notificationService.successMessage('Comanda paga!') });

    }


}