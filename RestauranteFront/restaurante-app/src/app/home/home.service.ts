import { ModelPaga } from './comanda/models/modelPaga';
import { BuscarModel } from './comanda/models/buscar-model';
import { AberturaModel } from './../inicial/models/abertura-model';
import { Injectable } from "@angular/core";
import { take } from 'rxjs/operators';
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { IniciadaModel } from './comanda/models/iniciada-model';
import { HomeComponent } from './home.component';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()

export class HomeService {

    baseUrl = `${environment.apiUrl}/comanda/`

    public comandaId: number;
    private _comanda = new BehaviorSubject<ModelPaga>(null);
    public readonly comanda: Observable<ModelPaga> = this._comanda.asObservable();

    constructor(private http: HttpClient,
        private router: Router,
        private route: ActivatedRoute) {
    }

    iniciar(iniciar: AberturaModel) {

        return this.http
            .post<IniciadaModel>(this.baseUrl, iniciar)
            .pipe(
                take(1)).subscribe(comanda => {
                    this.comandaId = comanda.comandaId;
                    console.log("Service subscribe:", comanda)
                    const c = this._comanda.getValue();
                    this._comanda.next(c);
                    this.router.navigate(["home",this.comandaId], { relativeTo: this.route })
                });

    }

    obterComanda(comandaId: number): Observable<BuscarModel> {
        return this.http
            .get<BuscarModel>(this.baseUrl + comandaId)
            .pipe(
                take(1));
    }

    setarComandaId() {
        this.route.params.subscribe((params) => {
            this.comandaId = +params['comandaId'];
        });
    }
}