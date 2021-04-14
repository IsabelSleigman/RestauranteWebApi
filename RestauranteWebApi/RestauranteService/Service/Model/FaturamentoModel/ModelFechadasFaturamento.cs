using System;
using System.Collections.Generic;
using System.Text;

namespace RestauranteService.Service.Model.FaturamentoModel
{
    public class ModelFechadasFaturamento
    {
        public int ComandaId { get; set; }

        public DateTime DataHoraEntrada { get; set; }

        public DateTime? DataHoraSaida { get; set; }

        public double ValorComanda { get; set; }

        public int QuantidadeClientes { get; set; }

        public int QuantidadePedidos { get; set; }

        public bool Cancelada { get; set; }

        public bool Pago { get; set; }



    }
}
