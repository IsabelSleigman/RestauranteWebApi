using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;

namespace RestauranteService.Services.Model
{
    public class ComandaModel
    {
        public int ComandaId { get; set; }
        public int MesaId { get; set; }
 
        public DateTime DataHoraEntrada { get; set; }

        public DateTime? DataHoraSaida { get; set; }

        public double ValorComanda { get; set; }

        public int QuantidadeClientes { get; set; }

        public bool Pago { get; set; }

        public ICollection<PedidoModel> Pedidos { get; set; }

        public ComandaModel()
        {
            Pedidos = new Collection<PedidoModel>();
        }
    }
}