using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using RestauranteService.Service;
using RestauranteService.Service.ComandaModel;
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

        [HttpGet("obter/comanda/{mesaId}")]
        public async Task<BuscarModel> ObterComanda(int mesaId)
        {
            var model = await _comandaService.BuscarComanda(mesaId);
            return model;
        }

        [HttpGet("buscar/completa/{comandaId}")]
        public async Task<ModelPaga> BuscarComandaCompleta(int comandaId)
        {
            var listaModel = await _comandaService.BuscarComandaCompleta(comandaId);
            return listaModel;
        }

        [HttpPost("iniciar/{mesaId}/{quantidade}")]
        public async Task IniciarComanda(int mesaId, int quantidade)
        {
            await _comandaService.IniciarComanda(mesaId, quantidade);
        }

        [HttpPut("fechar/{comandaId}")]
        public async Task FecharComanda(int comandaId)
        {
            await _comandaService.FecharComanda(comandaId);
        }

        [HttpPut("cancela/{comandaId}")]
        public async Task CancelarComanda(int comandaId)
        {
            await _comandaService.CancelarComanda(comandaId);
        }
        
    }
}
