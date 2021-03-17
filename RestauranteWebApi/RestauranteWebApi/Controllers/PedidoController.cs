using Microsoft.AspNetCore.Mvc;
using RestauranteService.Service;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RestauranteWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PedidoController : ControllerBase
    {
        private readonly PedidoService _pedidoService;
        public PedidoController(PedidoService pedidoService)
        {
            _pedidoService = pedidoService;
        }

        [HttpPost("fazer/pedido/{produtoId}/{quantidade}/{comandaId}")]
        public async Task FazerPedido(int produtoId, int quantidade, int comandaId)
        {
            await _pedidoService.FazerPedido(produtoId, quantidade, comandaId);
        }

        [HttpPut("editar/{quantidade}/{comandaId}")]
        public async Task EditarPedido(int quantidade, int comandaId)
        {
            await _pedidoService.EditarPedido(quantidade, comandaId);
        }

        [HttpPut("excluir/{comandaId}")]
        public async Task ExcluirPedido(int comandaId)
        {
            await _pedidoService.ExcluirPedido(comandaId);
        }
    }
}
