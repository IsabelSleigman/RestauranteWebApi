using RestauranteService.Service.PedidoModel;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace RestauranteService.Service.ComandaModel
{
   public class ModelPaga
    {
        public int ComandaId { get; set; }

        public int MesaId { get; set; }

        public DateTime DataHoraEntrada { get; set; }

        public DateTime? DataHoraSaida { get; set; }

        public double ValorComanda { get; set; }

        public int QuantidadeClientes { get; set; }

        public bool Pago { get; set; }

        public ICollection<ListarModel> Pedidos { get; set; }

        public ModelPaga()
        {
            Pedidos = new Collection<ListarModel>();
        }
    }
}
