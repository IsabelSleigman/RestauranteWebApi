using RestauranteDominio;

namespace RestauranteService.Service.PedidoModel
{
   public class ListarModel
    {
        public int PedidoId { get; set; }
        public int ProdutoId { get; set; }
        public string ProdutoNome { get; set; }
        public double PedidoValor { get; set; }
        public int QuantidadeProduto { get; set; }
        public string Status { get; set; }
    }
}
