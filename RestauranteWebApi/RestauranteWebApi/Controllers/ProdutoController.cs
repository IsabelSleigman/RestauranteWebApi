using Microsoft.AspNetCore.Mvc;
using RestauranteService.Service;
using RestauranteService.Service.ProdutoModel;
using System.Collections.Generic;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RestauranteWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutoController : ControllerBase
    {
        private readonly ProdutoService _produtoService;
        public ProdutoController(ProdutoService produtoService)
        {
            _produtoService = produtoService;
        }

        [HttpGet()]
        public async Task<List<ListarDisponivelModel>> BuscarProdutosDisponiveis()
        {
            return await _produtoService.MostrarDisponiveis();
     
        }
    }
}
