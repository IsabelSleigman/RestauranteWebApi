import { HomeService } from 'src/app/home/home.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {ModelCompleta } from './models/modelCompleta';
const baseUrl = `${environment.apiUrl}/comanda`

@Injectable({ providedIn: 'root' })

export class ComandaService {
    
    private _comanda = new BehaviorSubject<ModelCompleta>(null);
    public readonly comanda$: Observable<ModelCompleta> = this._comanda.asObservable();

    constructor(private http: HttpClient,
       private homeService: HomeService) {
    }
   
    obterComanda(){
        return this.http
            .get<ModelCompleta>(`${baseUrl}/${this.homeService.comandaId}/completa`)
            .pipe(
                take(1))
                .subscribe(res => this._comanda.next(res));
    }


}