using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using RestauranteService.Service;
using RestauranteService.Service.ComandaModel;
using RestauranteService.Service.Model.ComandaModel;
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

        [HttpGet("{comandaId}")]
        public async Task<BuscarModel> ObterComanda(int comandaId)
        {
            var comanda = await _comandaService.BuscarIniciada(comandaId);
            return comanda;
        }

        [HttpGet("{comandaId}/completa")]
        public async Task<ModelPaga> BuscarCompleta(int comandaId)
        {
            var listaModel = await _comandaService.BuscarCompleta(comandaId);
            return listaModel;
        }

        [HttpPost()]
        public async Task<int> Iniciar(AberturaModel model)
        {
           return await _comandaService.Iniciar(model);

        }

        [HttpPost("{comandaId}/fechar")]
        public async Task Fechar(int comandaId)
        {
            await _comandaService.Fechar(comandaId);
        }

        [HttpDelete("{comandaId}/cancelar")]
        public async Task CancelarComanda(int comandaId)
        {
            await _comandaService.Cancelar(comandaId);
        }
        
    }
}
