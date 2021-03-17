using Microsoft.AspNetCore.Mvc;
using RestauranteService.Service;
using RestauranteService.Service.MesaModel;
using System.Collections.Generic;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RestauranteWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MesaController : ControllerBase
    {
        private readonly MesaService _mesaService;

        public MesaController(MesaService mesaService)
        {
            _mesaService = mesaService;
        }

        [HttpGet("busca/mesa")]
        public async Task<List<ListarIdModel>> BuscarMesasDisponiveis()
        {
           var mesas = await _mesaService.BuscarMesasDisponiveis();
            return mesas;
        }

    }
}
