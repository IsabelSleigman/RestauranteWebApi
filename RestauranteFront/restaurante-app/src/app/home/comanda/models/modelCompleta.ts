import { ListarModel } from '../../pedido/models/listarModel';
export interface ModelCompleta {

    comandaId: number;
    mesaId: number
    dataHoraEntrada: Date;
    dataHoraSaida?: Date;
    valorComanda: number
    quantidadeClientes: number
    pago: boolean;
    pedidos: ListarModel[] ;

}