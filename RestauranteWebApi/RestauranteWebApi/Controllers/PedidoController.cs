using Microsoft.AspNetCore.Mvc;
using RestauranteService.Service;
using RestauranteService.Service.Model.PedidoModel;
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

        [HttpPost("{produtoId}/{quantidade}/{comandaId}")]
        public async Task<RealizadaModel> FazerPedido(RealizarModel model)
        {
            var pedido = await _pedidoService.FazerPedido(model);
            return pedido;
        }

        [HttpPost("{pedidoId}/{comandaId}/{quantidade}/editar")]
        public async Task Editar(RealizadaModel model)
        {
            await _pedidoService.Editar(model);
        }

        [HttpDelete("{pedidoId}/{comandaId}")]
        public async Task Excluir(ExcluirModel model)
        {
            await _pedidoService.Excluir(model);
        }
    }
}
