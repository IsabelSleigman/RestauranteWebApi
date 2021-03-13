using RestauranteService.Service.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace RestauranteService.Services.Model
{
   public class PedidoModel
    {
        public int PedidoId { get; set; }
        public int ProdutoId { get; set; }
        public string ProdutoNome { get; set; }
        public double PedidoValor { get; set; }
        public int QuantidadeProduto { get; set; }
        public int StatusId { get; set; }
        public StatusPedidoEnum Descricao { get; set; }
        public ProdutoModel Produto { get; set; }
    }
}
