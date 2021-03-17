using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;


namespace RestauranteService.Service.ComandaModel
{
    public class BuscarModel
    {
        public int ComandaId { get; set; }

        public int MesaId { get; set; }

        public DateTime DataHoraEntrada { get; set; }

        public double ValorComanda { get; set; }

        public int QuantidadeClientes { get; set; }
   
    }
}