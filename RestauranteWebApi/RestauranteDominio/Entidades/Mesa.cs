using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace RestauranteDominio
{
    public class Mesa
    {
        [Key]

        public int MesaId { get; set; }

        public bool Disponivel { get; set; }
    }
}
