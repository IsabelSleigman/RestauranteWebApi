import { Injectable } from "@angular/core";
import { take } from 'rxjs/operators';
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { MesaModel } from "./models/mesa-model";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root'})

export class InicialService {

    baseUrl = `${environment.apiUrl}/mesa`

    constructor(private http: HttpClient){
    }

    obterMesas(){
      return this.http
      .get<MesaModel[]>(this.baseUrl)
        .pipe(
            take(1));
    }
}