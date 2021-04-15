export interface FechadasFaturamento{
    
    comandaId: number,
    dataHoraEntrada: Date,
    dataHoraSaida: Date,
    valorComanda: number,
    quantidadeClientes: number,
    quantidadePedidos: number,
    cancelada: boolean,
    pago: boolean,
}
