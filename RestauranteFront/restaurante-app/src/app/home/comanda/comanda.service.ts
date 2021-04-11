import { ModelCompleta } from './models/modelCompleta';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BuscarModel } from './models/buscar-model';


@Injectable({ providedIn: 'root' })

export class ComandaService {
    
    baseUrl = `${environment.apiUrl}/comanda/`

    public comandaId: number;
    private _comanda = new BehaviorSubject<ModelCompleta>(null);
    public readonly comanda$: Observable<ModelCompleta> = this._comanda.asObservable();

    constructor(private http: HttpClient,
        private router: Router,
        private route: ActivatedRoute) {
    }
   
   

}