using System;
using System.Collections.Generic;
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

        public async Task FazerPedido(int produtoId, int quantidade, int comandaId)
        { 
            var produto = await _produtoService.BucarProdutoEscolhido(produtoId);

            _ = produto ?? throw new Exception("Produto não encontrado.");

            var status = await _contexto.Status
                .Where(s => s.StatusId == (int)StatusPedidoEnum.PedidoEmProcesso)
                .FirstOrDefaultAsync();

            _ = status ?? throw new Exception("Produto não encontrado.");

            var totalPedido = produto.Valor * quantidade;

            if (quantidade < 1 || quantidade > 7)
            {
                throw new Exception("Quantidade não permitida");
            }
            else
            {
                _contexto.Add(new Pedido
                {
                    ComandaId = comandaId,
                    ProdutoId = produto.ProdutoId,
                    PedidoValor = totalPedido,
                    QuantidadeProduto = quantidade,
                    StatusId = (int)StatusPedidoEnum.PedidoEmProcesso,
                    Status = status
                });

                if(totalPedido > 0)
                {
                    var comanda = _contexto.Comanda
                  .Where(c => c.ComandaId == comandaId)
                  .FirstOrDefault();

                    comanda.ValorComanda += totalPedido;
                }
                await _contexto.SaveChangesAsync();
            }
        }

        public async Task EditarPedido(int quantidade, int comandaId)
        {

            if (quantidade < 1 && quantidade > 7)
            {
                throw new Exception("Quantidade não permitida");
            }
            else
            {
                var pedido = await _contexto.Pedido
                .Where(p =>p.ComandaId == comandaId)
                .Include(p => p.Produto)
                .Include(c => c.Comanda)
                .OrderBy(p => p.PedidoId)
                .LastOrDefaultAsync();

                _ = pedido ?? throw new Exception("Pedido não encontrado.");

                if(pedido.StatusId == (int)StatusPedidoEnum.PedidoCancelado)
                {
                    throw new Exception("Pedido Excluido");
                }
                var total = pedido.Produto.Valor * quantidade;

                pedido.QuantidadeProduto = quantidade;               

                if (total > 0)
                {
                    var comanda = _contexto.Comanda
                  .Where(c => c.ComandaId == pedido.ComandaId)
                  .FirstOrDefault();

                    comanda.ValorComanda -= pedido.PedidoValor;
                    comanda.ValorComanda += total;
                }

                pedido.PedidoValor = total;
                
                await _contexto.SaveChangesAsync();
            }
        }

        public async Task ExcluirPedido(int comandaId)
        {
            var pedido = await _contexto.Pedido
            .Where(p => p.ComandaId == comandaId)
            .OrderBy(p => p.PedidoId)
            .LastOrDefaultAsync();

            _ = pedido ?? throw new Exception("Pedido não encontrado");

            var status = await _contexto.Status
               .Where(s => s.StatusId == (int)StatusPedidoEnum.PedidoCancelado)
               .FirstOrDefaultAsync();

            _ = status ?? throw new Exception("Produto não encontrado.");

            pedido.StatusId = (int)StatusPedidoEnum.PedidoCancelado;

            pedido.Status = status;

            pedido.QuantidadeProduto = 0;

            if (pedido.PedidoValor > 0)
            {
                var comanda = _contexto.Comanda
              .Where(c => c.ComandaId == pedido.ComandaId)
              .FirstOrDefault();

                comanda.ValorComanda -= pedido.PedidoValor;
                
            }

            await _contexto.SaveChangesAsync();
        }
       
    }
}