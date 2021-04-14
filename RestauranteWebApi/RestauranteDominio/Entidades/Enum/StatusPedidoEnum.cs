using System;
using System.Collections.Generic;
using System.Text;

namespace RestauranteDominio.Enum
{
    public enum StatusPedidoEnum
    { 
            AguardandoPedido = 1,
            PedidoRealizado = 2,
            PedidoEmProcesso = 3,
            PedidoEntregue = 4,
            PedidoCancelado = 5   
    }
}
