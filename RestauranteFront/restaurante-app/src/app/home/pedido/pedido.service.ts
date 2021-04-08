import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable()

export class PedidoService {

    baseUrl = `${environment.apiUrl}/pedido`
}