import { BuscarModel } from './comanda/models/buscar-model';
import { AberturaModel } from './../inicial/models/abertura-model';
import { Injectable } from "@angular/core";
import { take } from 'rxjs/operators';
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { IniciadaModel } from './comanda/models/iniciada-model';
import { HomeComponent } from './home.component';

@Injectable({ providedIn: 'root' })

export class HomeService {

    baseUrl = `${environment.apiUrl}/comanda`

    constructor(private http: HttpClient) {
    }

    iniciar(iniciar: AberturaModel) : Observable<IniciadaModel> {

        return this.http
        .post<IniciadaModel>(this.baseUrl, iniciar)
        .pipe(
            take(1));

    }
    
    obterComanda(comandaId: number) : Observable<BuscarModel> {
        return this.http
            .get<BuscarModel>(this.baseUrl + comandaId)
            .pipe(
                take(1));
    }
    
}