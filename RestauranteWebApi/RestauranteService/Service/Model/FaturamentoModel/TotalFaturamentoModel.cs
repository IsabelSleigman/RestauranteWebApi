using System;
using System.Collections.Generic;
using System.Text;

namespace RestauranteService.Service.Model.FaturamentoModel
{
    public class TotalFaturamentoModel
    {
         public int QuantidadeAtentimento{ get; set; }

        public int QuantidadeCliente { get; set; }

        public double LucroTotal { get; set; }
    }
}
