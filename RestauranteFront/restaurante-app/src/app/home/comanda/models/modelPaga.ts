import { ListarModel } from './../../pedido/models/listar-model';
export interface ModelPaga {

    comandaId: number;
    mesaId: number
    dataHoraEntrada: Date;
    dataHoraSaida?: Date;
    ValorComanda: number
    quantidadeClientes: number
    pago: boolean;
    pedidos: ListarModel[] ;

}