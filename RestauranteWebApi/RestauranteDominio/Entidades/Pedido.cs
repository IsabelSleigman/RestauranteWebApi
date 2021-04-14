using RestauranteDominio.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace RestauranteDominio
{
   public class Pedido
    {
        [Key]

        public int PedidoId { get; set; } //PK

        public int ComandaId { get; set; } //FK
        [ForeignKey(nameof(ComandaId))]

        public Comanda Comanda { get; set; }

        public int ProdutoId { get; set; } //FK
        [ForeignKey(nameof(ProdutoId))]

        public Produto Produto { get; set; }

        public double PedidoValor { get; set; }

        public int QuantidadeProduto { get; set; }

        [Column("StatusId")]
        public StatusPedidoEnum StatusEnum { get; set; } //FK

    }
}
