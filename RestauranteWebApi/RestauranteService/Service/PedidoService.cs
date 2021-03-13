using RestauranteService.Services.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using RestauranteDominio;
using RestauranteService.Service.Enum;

namespace RestauranteService.Service
{
    public class PedidoService 
    {
        private readonly RestauranteContexto _contexto;

        private readonly ProdutoService _produtoService;

        private readonly ComandaService _comandaService;

        public PedidoService(RestauranteContexto contexto, ProdutoService produtoService, ComandaService comandaService)
        {
            _contexto = contexto;
            _produtoService = produtoService;
            _comandaService = comandaService;
        }

        public async Task FazerPedido(int produtoId, int quantidade, int mesaId)
        {
            if (produtoId <= 1 || produtoId > 17)
            {
                throw new Exception("Produto não disponivel!");
            }
            var produto = await _produtoService.BucarProdutoEscolhido(produtoId);

            _ = produto ?? throw new Exception("Produto não encontrado.");

            var comanda = await _comandaService.BuscarComanda(mesaId);

            _ = comanda ?? throw new Exception("Comanda não encontrada.");

            var totalPedido = produto.Valor * quantidade;

            if (quantidade < 1 || quantidade > 7)
            {
                throw new Exception("Quantidade não permitida");
            }
            else
            {
                _contexto.Add(new Pedido
                {
                    ComandaId = comanda.ComandaId,
                    ProdutoId = produto.ProdutoId,
                    PedidoValor = totalPedido,
                    QuantidadeProduto = quantidade,
                    StatusId = (int)StatusPedidoEnum.PedidoEmProcesso

                });
              await _comandaService.AtualizarComanda(mesaId);

                await _contexto.SaveChangesAsync();
            }
        }

        public async Task EditarPedido(int quantidade, int mesaId)
        {
            var comanda = await _comandaService.BuscarComanda(mesaId);

            _ = comanda ?? throw new Exception("Comanda não encontrada.");

            if (quantidade < 1 && quantidade > 7)
            {
                throw new Exception("Quantidade não permitida");
            }
            else
            {
                var pedido = _contexto.Pedido
                .Include(p => p.Produto).Include(c => c.Comanda)
                .Where(p => p.ComandaId == comanda.ComandaId && p.PedidoId == _contexto.Pedido.ToList().Count)
                .OrderBy(p => p.PedidoId)
                .LastOrDefault();

                _ = pedido ?? throw new Exception("Pedido não encontrado.");

                var total = pedido.Produto.Valor * quantidade;

                pedido.QuantidadeProduto = quantidade;

                pedido.PedidoValor = total;

                //await _comandaService.AtualizarComanda(comanda.ComandaId, pedido.PedidoValor);

                await _contexto.SaveChangesAsync();
            }
        }

        public async Task ExcluirPedido(int mesaId)
        {
            var comanda = await _comandaService.BuscarComanda(mesaId);

            _ = comanda ?? throw new Exception("Comanda não encontrada.");

            var pedido = _contexto.Pedido
               .Include(p => p.Produto)
               .Where(p => p.ComandaId == comanda.ComandaId && p.PedidoId == _contexto.Pedido.ToList().Count)
               .OrderBy(c => c.PedidoId)
               .LastOrDefault();

            pedido.StatusId = (int)StatusPedidoEnum.PedidoCancelado;

            pedido.PedidoValor = 0.0;

            pedido.QuantidadeProduto = 0;

            await _contexto.SaveChangesAsync();
        }

        public async Task<List<PedidoModel>> ListarPedidoCliente(int mesaId)
        {
            var comanda = await _comandaService.BuscarComanda(mesaId);

            _ = comanda ?? throw new Exception("Comanda não encontrada.");

            var pedidos = await _contexto.Pedido
                .Include(p => p.Produto)
                .Where(p => p.ComandaId == comanda.ComandaId)
                .OrderBy(l => l.PedidoId)
                .Select(p => new PedidoModel
            {
                PedidoId = p.PedidoId,
                PedidoValor = p.PedidoValor,
                ProdutoId = p.ProdutoId,
                ProdutoNome = p.Produto.Nome,
                QuantidadeProduto = p.QuantidadeProduto,
                StatusId = p.StatusId
            }).ToListAsync();

            return pedidos;
        }

        public Task<bool> SaveChangeAsync()
        {
            throw new NotImplementedException();
        }
    }
}