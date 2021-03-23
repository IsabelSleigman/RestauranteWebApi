using System;
using System.Collections.Generic;
using System.Text;

namespace RestauranteService.Service.Model.PedidoModel
{
    public class ExcluirModel
    {
        public int PedidoId { get; set; }
        public int ComandaId { get; set; }

        public void Validar()
        {
            if (PedidoId < 1)
                throw new Exception("Pedido Inválido");

            if (ComandaId <= 0)
                throw new Exception("Comanda Inválida");

        }
    }
}
