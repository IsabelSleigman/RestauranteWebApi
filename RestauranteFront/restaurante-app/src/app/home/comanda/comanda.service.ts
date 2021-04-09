import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BuscarModel } from './models/buscar-model';
import { ModelPaga } from './models/modelPaga';

@Injectable({ providedIn: 'root' })

export class ComandaService {
    
    baseUrl = `${environment.apiUrl}/comanda/`

    public comandaId: number;
    private _comanda = new BehaviorSubject<ModelPaga>(null);
    public readonly comanda$: Observable<ModelPaga> = this._comanda.asObservable();

    constructor(private http: HttpClient,
        private router: Router,
        private route: ActivatedRoute) {
    }
   
    obterComanda(comandaId: number): Observable<BuscarModel> {
        return this.http
            .get<BuscarModel>(this.baseUrl + comandaId)
            .pipe(
                take(1));
    }


}