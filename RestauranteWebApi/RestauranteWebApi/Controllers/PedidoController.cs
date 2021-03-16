using Microsoft.AspNetCore.Mvc;
using RestauranteService.Service;
using RestauranteService.Services.Model;
using System;
using System.Collections.Generic;
using System.Linq;
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

        // GET api/<PedidoController>/5
        [HttpGet("BuscarPedidosCliente/{mesaId}")]
        public async Task<List<PedidoModel>> BuscarPedidosCliente(int mesaId)
        {
            var listaPedidos = await _pedidoService.ListarPedidoCliente(mesaId);
            return listaPedidos;
        }

        // PUT api/<PedidoController>/5
        [HttpPut("FazerPedido/{produtoId}/{quantidade}/{mesaId}")]
        public async Task FazerPedido(int produtoId, int quantidade, int mesaId)
        {
            await _pedidoService.FazerPedido(produtoId, quantidade, mesaId);
        }

        // PUT api/<PedidoController>
        [HttpPut("EditarPedido/{quantidade}/{mesaId}")]
        public async Task EditarPedido(int quantidade, int mesaId)
        {
            await _pedidoService.EditarPedido(quantidade, mesaId);
        }


        // DELETE api/<PedidoController>/5
        [HttpPut("ExcluirPedido/{mesaId}")]
        public async Task ExcluirPedido(int mesaId)
        {
            await _pedidoService.ExcluirPedido(mesaId);
        }
    }
}
