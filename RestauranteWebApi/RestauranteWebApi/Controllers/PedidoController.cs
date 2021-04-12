using Microsoft.AspNetCore.Mvc;
using RestauranteService.Service;
using RestauranteService.Service.Model.PedidoModel;
using RestauranteService.Service.PedidoModel;
using System.Collections.Generic;
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

        [HttpGet("{comandaId}")]
        public async Task<List<ListarModel>> ListarRealizados(int comandaId)
        {
            return await _pedidoService.ListarRealizados(comandaId);
        }

        [HttpPost()]
        public async Task<int> FazerPedido(RealizarModel model)
        {
            return await _pedidoService.FazerPedido(model);
        }

        [HttpPut("editar")]
        public async Task<ListarModel> Editar(RealizadaModel model)
        {
            return await _pedidoService.Editar(model);
        }

        [HttpDelete("{pedidoId}/{comandaId}")]
        public async Task<ListarModel> Excluir(int pedidoId, int comandaId)
        {
           return await _pedidoService.Excluir(pedidoId, comandaId);
        }
    }
}
