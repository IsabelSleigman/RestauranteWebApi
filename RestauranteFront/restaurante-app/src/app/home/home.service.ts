import { ModelCompleta } from './comanda/models/modelCompleta';

import { AberturaModel } from './../inicial/models/abertura-model';
import { Injectable } from "@angular/core";
import { catchError, take } from 'rxjs/operators';
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ActivatedRoute, Params, Router } from '@angular/router';
const baseUrl = `${environment.apiUrl}/comanda`

@Injectable()

export class HomeService {



    public comandaId: number;
    private _comanda = new BehaviorSubject<ModelCompleta>(null);
    public readonly comanda$: Observable<ModelCompleta> = this._comanda.asObservable();

    constructor(private http: HttpClient,
        private router: Router,
        private route: ActivatedRoute) {
    }

    iniciar(iniciar: AberturaModel) {

        return this.http
            .post<number>(`${baseUrl}`, iniciar)
            .pipe(
                take(1)).subscribe(id => {
                    this.comandaId = id;
                    const c = this._comanda.getValue();
                    this._comanda.next(c);
                    this.router.navigate(["home", this.comandaId], { relativeTo: this.route })
                });

    }

    obterComanda() {
        return this.http
            .get<ModelCompleta>(`${baseUrl}/${this.comandaId}/completa`)
            .pipe(
                take(1),catchError((error: HttpErrorResponse) => {
                    throw error;
                })).subscribe(res => this._comanda.next(res));
    }

    fecharComanda() {
        this.http
            .post(`${baseUrl}/${this.comandaId}/fechar`,this.comandaId)
            .pipe( 
                take(1), catchError((error: HttpErrorResponse) => {
                    throw error;
                   
                })).subscribe(() => {});
                
    }

}