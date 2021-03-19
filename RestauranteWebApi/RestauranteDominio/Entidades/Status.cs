using RestauranteDominio.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace RestauranteDominio
{
   public class Status
    {
        [Key]

        [Column("StatusId")]
        public StatusPedidoEnum StatusEnum { get; set; }

        public string Descricao { get; set; }
    }
}
