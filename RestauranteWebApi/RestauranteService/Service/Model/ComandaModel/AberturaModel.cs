using System;
using System.Collections.Generic;
using System.Text;

namespace RestauranteService.Service.Model.ComandaModel
{
    public class AberturaModel
    {
        public int MesaId { get; set; }
        public int QuantidadeClientes { get; set; }

        public void Validar()
        {
            if (QuantidadeClientes <= 0 || QuantidadeClientes > 4)
                throw new Exception("Quantidade de pessoas não permitida!");
        }
    }
}
