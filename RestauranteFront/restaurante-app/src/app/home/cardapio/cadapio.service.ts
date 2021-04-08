import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ListarDisponivelModel } from "./models/listarDisponivelModel";

@Injectable()
export class CardapioService {

    constructor(private http: HttpClient){
    }
    
    baseUrl = `${environment.apiUrl}/produto`

    listarProduto(){
      return this.http
      .get<ListarDisponivelModel[]>(this.baseUrl)
        .pipe(
            take(1));
    }

    obterProduto(produtoId: number){
      return this.http
      .get<ListarDisponivelModel>(this.baseUrl+produtoId+"/obter")
        .pipe(
            take(1));
    }
}