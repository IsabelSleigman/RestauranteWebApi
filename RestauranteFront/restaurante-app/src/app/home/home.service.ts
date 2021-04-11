import { ModelCompleta } from './comanda/models/modelCompleta';

import { AberturaModel } from './../inicial/models/abertura-model';
import { Injectable } from "@angular/core";
import { take } from 'rxjs/operators';
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Params, Router } from '@angular/router';

@Injectable()

export class HomeService {

    baseUrl = `${environment.apiUrl}/comanda`

    public comandaId: number;
    private _comanda = new BehaviorSubject<ModelCompleta>(null);
    public readonly comanda$: Observable<ModelCompleta> = this._comanda.asObservable();

    constructor(private http: HttpClient,
        private router: Router,
        private route: ActivatedRoute) {
    }

    iniciar(iniciar: AberturaModel) {

        return this.http
            .post<number>( `${this.baseUrl}`, iniciar)
            .pipe(
                take(1)).subscribe(id => {
                    this.comandaId = id;
                    const c = this._comanda.getValue();
                    this._comanda.next(c);
                    this.router.navigate(["home",this.comandaId], { relativeTo: this.route })
                });

    }

    obterComanda(): Observable<ModelCompleta> {
        return this.http
            .get<ModelCompleta>(this.baseUrl + this.comandaId)
            .pipe(
                take(1));
    }

}