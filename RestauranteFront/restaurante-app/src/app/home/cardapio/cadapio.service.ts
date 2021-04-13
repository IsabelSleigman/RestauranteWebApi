import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ListarDisponivelModel } from "./models/listarDisponivelModel";
const baseUrl = `${environment.apiUrl}/produto`

@Injectable({ providedIn: 'root' })

export class CardapioService {

    constructor(private http: HttpClient){
    }

    listarProduto(){
      return this.http
      .get<ListarDisponivelModel[]>(`${baseUrl}`)
        .pipe(
            take(1));
    }

}