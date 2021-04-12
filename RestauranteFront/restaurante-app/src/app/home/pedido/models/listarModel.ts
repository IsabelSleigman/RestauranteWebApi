import { StatusPedidoEnum } from "src/app/const/status-pedido.enum";

export interface ListarModel { 

    pedidoId: number;
    produtoId: number;
    produtoNome: string;
    pedidoValor: number;
    quantidadeProduto: number;
    statusEnum: StatusPedidoEnum;
}