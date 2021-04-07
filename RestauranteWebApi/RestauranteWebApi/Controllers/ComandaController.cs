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

        [HttpGet()]
        public async Task<BuscarModel> ObterComanda(IniciadaModel model)
        {
            var comanda = await _comandaService.BuscarIniciada(model);
            return comanda;
        }

        [HttpGet("/completa")]
        public async Task<ModelPaga> BuscarCompleta(IniciadaModel model)
        {
            var listaModel = await _comandaService.BuscarCompleta(model);
            return listaModel;
        }

        [HttpPost()]
        public async Task<IniciadaModel> Iniciar(AberturaModel model)
        {
           var iniciadaModel = await _comandaService.Iniciar(model);
            return iniciadaModel;
        }

        [HttpPost("/fechar")]
        public async Task Fechar(IniciadaModel model)
        {
            await _comandaService.Fechar(model);
        }

        [HttpDelete("/cancelar")]
        public async Task CancelarComanda(IniciadaModel model)
        {
            await _comandaService.Cancelar(model);
        }
        
    }
}
