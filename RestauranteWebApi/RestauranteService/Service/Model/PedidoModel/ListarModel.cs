using RestauranteDominio;
using RestauranteService.Service.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace RestauranteService.Service.PedidoModel
{
   public class ListarModel
    {
        public int PedidoId { get; set; }
        public int ProdutoId { get; set; }
        public string ProdutoNome { get; set; }
        public double PedidoValor { get; set; }
        public int QuantidadeProduto { get; set; }
        public Status Status { get; set; }
    }
}
