﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using RestauranteDominio;
using RestauranteDominio.Enum;
using RestauranteService.Service.Model.PedidoModel;
using RestauranteService.Service.PedidoModel;

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

        public async Task<int> FazerPedido(RealizarModel model)
        {
            model.Validar();

            var produto = await _contexto
                .Produto
                .Where(p => p.ProdutoId == model.ProdutoId && p.Disponivel == true)
                .Select(p => new
                {
                    p.Valor
                })
                .FirstOrDefaultAsync();

            _ = produto ?? throw new Exception("Produto não encontrado.");

            var totalPedido = produto.Valor * model.Quantidade;

            var pedido = new Pedido
            {
                ComandaId = model.ComandaId,
                ProdutoId = model.ProdutoId,
                PedidoValor = totalPedido,
                QuantidadeProduto = model.Quantidade,
                StatusEnum = StatusPedidoEnum.PedidoEmProcesso,
            };

            if (totalPedido > 0)
            {
                var comanda = await _contexto
                    .Comanda
                    .Where(c => c.ComandaId == model.ComandaId)
                    .FirstOrDefaultAsync();

                comanda.ValorComanda += totalPedido;
            }

            _contexto.Pedido.Add(pedido);

            await _contexto.SaveChangesAsync();

            return pedido.PedidoId;
        }

        public async Task<ListarModel> Editar(RealizadaModel model)
        {
            model.Validar();

            var pedido = await _contexto
                .Pedido
                .Where(p => p.PedidoId == model.PedidoId)
                .Include(p => p.Status)
                .Include(p => p.Produto)
                .Include(c => c.Comanda)
                .Where( c => c.ComandaId == model.ComandaId && c.Comanda.Pago == false)
                .OrderBy(p => p.PedidoId)
                .LastOrDefaultAsync();

            _ = pedido ?? throw new Exception("Pedido não encontrado.");

            if (pedido.StatusEnum == StatusPedidoEnum.PedidoCancelado)
            {
                throw new Exception("Pedido Excluido");
            }
            var total = pedido.Produto.Valor * model.Quantidade;

            pedido.QuantidadeProduto = model.Quantidade;

            if (total > 0)
            {
                var comanda = await _contexto
                    .Comanda
                    .Where(c => c.ComandaId == pedido.ComandaId)
                    .FirstOrDefaultAsync();

                comanda.ValorComanda -= pedido.PedidoValor;

                comanda.ValorComanda += total;
            }

            pedido.PedidoValor = total;

            await _contexto.SaveChangesAsync();

            return new ListarModel
            {
                PedidoId = pedido.PedidoId,
                PedidoValor = pedido.PedidoValor,
                ProdutoId = pedido.ProdutoId,
                ProdutoNome = pedido.Produto.Nome,
                QuantidadeProduto = pedido.QuantidadeProduto,
                Status = pedido.Status.Descricao

            };
        }

        public async Task<ListarModel> Excluir(int pedidoId, int comandaId)
        {

            var pedido = await _contexto
                           .Pedido
                           .Where(p => p.PedidoId == pedidoId)
                           .Include(p => p.Status)
                           .ThenInclude(p => p.Descricao)
                           .Include(p => p.Produto)
                           .Include(c => c.Comanda)
                           .Where(c => c.ComandaId == comandaId && c.Comanda.Pago == false)
                           .OrderBy(p => p.PedidoId)
                           .LastOrDefaultAsync();

            _ = pedido ?? throw new Exception("Pedido não encontrado");

            pedido.StatusEnum = StatusPedidoEnum.PedidoCancelado;

            pedido.QuantidadeProduto = 0;

            if (pedido.PedidoValor > 0)
            {
                var comanda = await _contexto
                    .Comanda
                    .Where(c => c.ComandaId == pedido.ComandaId)
                    .FirstOrDefaultAsync();

                comanda.ValorComanda -= pedido.PedidoValor;

            }

            await _contexto.SaveChangesAsync();

            return new ListarModel
            {
                PedidoId = pedido.PedidoId,
                PedidoValor = pedido.PedidoValor,
                ProdutoId = pedido.ProdutoId,
                ProdutoNome = pedido.Produto.Nome,
                QuantidadeProduto = pedido.QuantidadeProduto,
                Status = pedido.Status.Descricao

            };
        }
        public async Task<List<ListarModel>> ListarRealizados(int comandaId)
        {
            var listaPedidos = await _contexto
                .Pedido
                .Where(p =>p.ComandaId == comandaId)
                .Select(np => new ListarModel
                {
                    PedidoId= np.PedidoId,
                    PedidoValor= np.PedidoValor,
                    ProdutoId = np.ProdutoId,
                    ProdutoNome =np.Produto.Nome,
                    QuantidadeProduto= np.QuantidadeProduto,
                    Status= np.Status.Descricao
                }).ToListAsync();

            _ = listaPedidos ?? throw new Exception("Não Existem pedidos");

            return listaPedidos;
        }


    }
}