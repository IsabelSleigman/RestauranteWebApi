import { ModelCompleta } from './comanda/models/modelCompleta';
import { AberturaModel } from './../inicial/models/abertura-model';
import { Injectable } from "@angular/core";
import { catchError, take, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../shared/snackbar/notification.service';
const baseUrl = `${environment.apiUrl}/comanda`

@Injectable()

export class HomeService {

    private comandaId: number;
    private _comanda = new BehaviorSubject<ModelCompleta>(null);
    public readonly comanda$: Observable<ModelCompleta> = this._comanda.asObservable();

    constructor(private http: HttpClient,
        private router: Router,
        private route: ActivatedRoute,
        private snackbar: NotificationService) {
    }

    iniciar(iniciar: AberturaModel): Observable<number> {

        return this.http
            .post<number>(`${baseUrl}`, iniciar)
            .pipe(
                take(1),
                tap(c => console.log("inicial",this.comandaId = c)),
                catchError((error: HttpErrorResponse) => {
                    this.snackbar.errorMessage(error);
                    throw error;
            
                })
                
            )

    }

    atualizarComanda() {
        console.log("atualizar",this.comandaId)
        return this.http
            .get<ModelCompleta>(`${baseUrl}/${this.comandaId}`)
            .pipe(
                take(1),
                catchError((error: HttpErrorResponse) => {
                    this.snackbar.errorMessage(error);
                    throw error;
                })
            ).subscribe(res => this._comanda.next(res));
    }

    carregarComanda(comandaId : number) {
        console.log("atualizar",comandaId)
        return this.http
            .get<ModelCompleta>(`${baseUrl}/${comandaId}`)
            .pipe(
                take(1),
                tap(c => this.comandaId = c.comandaId),
                catchError((error: HttpErrorResponse) => {
                    this.snackbar.errorMessage(error);
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
                    this.snackbar.errorMessage(error);
                    throw error;
                })
            ).subscribe(() => { });

    }


}