using System;
using System.Collections.Generic;
using System.Text;

namespace RestauranteService.Service.Model.FaturamentoModel
{
    public class ModelAbertasFaturamento
    {
        public int ComandaId { get; set; }

        public int MesaId { get; set; }

        public DateTime DataHoraEntrada { get; set; }

        public double ValorComanda { get; set; }

        public int QuantidadeClientes { get; set; }

        public int QuantidadePedidos { get; set; }

        public bool Pago { get; set; }

    }
}
