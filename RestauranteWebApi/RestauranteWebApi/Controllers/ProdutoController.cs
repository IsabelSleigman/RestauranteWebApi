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
    public class ProdutoController : ControllerBase
    {
        private readonly ProdutoService _produtoService;
        public ProdutoController(ProdutoService produtoService)
        {
            _produtoService = produtoService;
        }

        [HttpGet("BuscarProdutosDisponiveis")]
        public async Task<List<ProdutoModel>> BuscarProdutosDisponiveis()
        {
            var listaProdutos = await _produtoService.MostrarProdutosDisponiveis();
            return listaProdutos;
        }
    }
}
