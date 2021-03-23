using System;

namespace RestauranteService.Service.Model.PedidoModel
{
    public class RealizarModel
    {
        public int ProdutoId { get; set; }
        public int Quantidade { get; set; }
        public int ComandaId { get; set; }

        public void Validar()
        {
            if (ProdutoId < 1)
                throw new Exception("Produto Inválido");
            
            if (Quantidade <= 0 || Quantidade > 7)
                throw new Exception("Quantidade Inválida");
            
            if (ComandaId <= 0)
                throw new Exception("Comanda Inválida");
            
        }
    }
}
