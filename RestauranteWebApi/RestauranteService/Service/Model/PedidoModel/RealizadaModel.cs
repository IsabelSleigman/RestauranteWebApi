using System;
using System.Collections.Generic;
using System.Text;

namespace RestauranteService.Service.Model.PedidoModel
{
    public class RealizadaModel
    {
        public int PedidoId { get; set; }
        public int ComandaId { get; set; }
        public int Quantidade { get; set; }

        public void Validar()
        {
            if (PedidoId < 1)
            {
                throw new Exception("Pedido Inválido");
            }
            if (Quantidade <= 0 || Quantidade > 7)
            {
                throw new Exception("Quantidade Inválida");
            }
            if (ComandaId <= 0)
            {
                throw new Exception("Comanda Inválida");
            }
        }
    }
}
