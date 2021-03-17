using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace RestauranteDominio
{
   public class Produto
    {
        [Key]

        public int ProdutoId { get; set; }

        public string Nome { get; set; }

        public double Valor { get; set; }

        public bool Disponivel { get; set; }
    }
}
