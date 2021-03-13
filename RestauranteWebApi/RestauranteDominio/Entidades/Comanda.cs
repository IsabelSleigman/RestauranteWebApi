using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace RestauranteDominio
{
  public class Comanda
    {
        [Key]
        public int ComandaId { get; set; } //PK
        public int MesaId { get; set; } //FK
        [ForeignKey(nameof(MesaId))]
        public Mesa Mesa { get; set; }

        public DateTime DataHoraEntrada { get; set; }

        public DateTime? DataHoraSaida { get; set; }

        public double ValorComanda { get; set; }

        public int QuantidadeClientes { get; set; }

        public bool Pago { get; set; }

        public ICollection<Pedido> Pedidos { get; set; }

        public Comanda()
        {
            this.Pedidos = new Collection<Pedido>();
        }
    }
}
