using Microsoft.AspNetCore.Mvc;
using RestauranteService.Service;
using RestauranteService.Service.Model.FaturamentoModel;
using System.Collections.Generic;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RestauranteWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FaturamentoController : ControllerBase
    {

        private readonly FaturamentoService _faturamentoService;
        public FaturamentoController(FaturamentoService faturamentoService)
        {
            _faturamentoService = faturamentoService;
        }

        [HttpGet("buscatotal")]
        public async Task<TotalFaturamentoModel> BuscaTotal()
        {
            return await _faturamentoService.BuscaTotal();
        }

        [HttpGet("fechadas")]
        public async Task<List<ModelFechadasFaturamento>> ListarFechadas()
        {
            return await _faturamentoService.ListarComandasFechadas();
        }

        [HttpGet("abertas")]
        public async Task<List<ModelAbertasFaturamento>> ListarAbertas()
        {
            return await _faturamentoService.BuscarAbertasFaturamento();
        }



    }
}
