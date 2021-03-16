using Microsoft.AspNetCore.Mvc;
using RestauranteService.Service;
using RestauranteService.Services.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RestauranteWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComandaController : ControllerBase
    {
        private readonly ComandaService _comandaService;
        public ComandaController(ComandaService comandaService)
        {
            _comandaService = comandaService;
        }

        // GET: api/<ComandaController>
        [HttpPut("IniciarComanda/{mesaId}/{quantidade}")]
        public async Task IniciarComanda(int mesaId, int quantidade)
        {
            await _comandaService.IniciarComanda(mesaId, quantidade);
        }

        // GET api/<ComandaController>/5
        [HttpPut("FecharComanda/{mesaId}")]
        public async Task FecharComanda(int mesaId)
        {
            await _comandaService.FecharComanda(mesaId);
        }

        // POST api/<ComandaController>
        [HttpGet("ObterComanda/{mesaId}")]
        public async Task<ComandaModel> ObterComanda(int mesaId)
        {
            var comanda = await _comandaService.BuscarComanda(mesaId);
            return comanda;
        }

        [HttpGet("BuscarComandaPaga/{mesaId}")]
        public async Task<ComandaModel> BuscarPedidosComanda(int mesaId)
        {
            var comandaPaga = await _comandaService.BuscarComandaPaga(mesaId);
            return comandaPaga;
        }
        [HttpGet("ListarPedidoComanda/{mesaId}")]
        public async Task<ComandaModel> ListarPedidoComanda(int mesaId)
        {
            var comanda = await _comandaService.BuscarPedidosComanda(mesaId);
            return comanda;
        }
        
    }
}
