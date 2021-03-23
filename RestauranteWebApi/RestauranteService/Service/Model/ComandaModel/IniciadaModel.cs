using System;
using System.Collections.Generic;
using System.Text;

namespace RestauranteService.Service.Model.ComandaModel
{
    public class IniciadaModel
    {
        public int ComandaId { get; set; }

        public void Validar()
        {
            if (ComandaId < 0 )
                throw new Exception("Comanda Inválida"); 
        }
    }
}
