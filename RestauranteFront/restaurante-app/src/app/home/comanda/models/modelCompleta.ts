import { ListarModel } from '../../pedido/models/listarModel';
export interface ModelCompleta {
    unsubscribe();

    comandaId: number,
    mesaId: number,
    dataHoraEntrada: Date,
    dataHoraSaida?: Date,
    valorComanda: number,
    quantidadeClientes: number
    quantidadePedidos: number,
    cancelada: boolean,
    pago: boolean,
    pedidos: ListarModel[]

}