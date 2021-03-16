using Microsoft.EntityFrameworkCore;
using RestauranteDominio;
using RestauranteService.Service.Enum;
using RestauranteService.Services.Model;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestauranteService.Service
{
    public class ComandaService
    {
        private readonly RestauranteContexto _contexto;

        private readonly MesaService _mesaService;

        public ComandaService(RestauranteContexto contexto, MesaService mesaService)
        {
            _contexto = contexto;
            _mesaService = mesaService;
        }

        public async Task IniciarComanda(int mesaId, int quantidade)
        {
            if (quantidade <= 0 || quantidade >= 5)
            {
                throw new Exception("Comanda já está em uso ou quantidade de pessoas não está correta!");
            }
            double valor = 80.0 * quantidade;

            await _mesaService.OcuparMesa(mesaId);

            var comanda = _contexto.Add(new Comanda
            {
                DataHoraEntrada = DateTime.Now,
                DataHoraSaida = null,
                MesaId = mesaId,
                QuantidadeClientes = quantidade,
                ValorComanda = valor,
                Pago = false,
            });
            
            await _contexto.SaveChangesAsync();
        }

        public async Task AtualizarComanda(int mesaId)
        {
            var comanda = await _contexto.Comanda
                .Where(c => c.MesaId == mesaId).FirstOrDefaultAsync();

            _ = comanda ?? throw new Exception("Comanda não localizada.");

          
            var pedidos = await _contexto.Pedido
                .Where(p => p.ComandaId == comanda.ComandaId)
                .ToListAsync();

            var valorPedidos = pedidos
                .Where(p => p.StatusId != 5)
                .Select(p => p.PedidoValor).Sum();
           
           comanda.ValorComanda += valorPedidos;

            await _contexto.SaveChangesAsync();
        }

        public async Task FecharComanda(int mesaId)
        {
            var comanda = await _contexto.Comanda
              .FirstOrDefaultAsync(c => c.MesaId == mesaId);

            _ = comanda ?? throw new Exception("Comanda não localizada.");

            comanda.Pago = true;

            comanda.DataHoraSaida = DateTime.Now;

            await AtualizarComanda(comanda.MesaId);

            await _mesaService.DesocuparMesa(comanda.MesaId);

            await _contexto.SaveChangesAsync();
        }

        public async Task<ComandaModel> BuscarComanda(int mesaId)
        {
            var comanda = _contexto.Comanda
                .Where(c => c.MesaId == mesaId)
                .Select(cn => new ComandaModel
                {
                    ComandaId = cn.ComandaId,
                    DataHoraEntrada = cn.DataHoraEntrada,
                    MesaId = cn.MesaId,
                    ValorComanda = cn.ValorComanda
                }).FirstOrDefaultAsync();

            _ = comanda ?? throw new Exception("Comanda não localizada.");

            return await comanda;
        }
        public async Task<ComandaModel> BuscarComandaPaga(int mesaId)
        {
            var comanda = _contexto.Comanda
                .Where(c => c.MesaId == mesaId)
                .Select(cn => new ComandaModel
                {
                    DataHoraSaida = cn.DataHoraSaida,
                    Pago = cn.Pago,
                    QuantidadeClientes= cn.QuantidadeClientes,
                    ComandaId = cn.ComandaId,
                    DataHoraEntrada = cn.DataHoraEntrada,
                    MesaId = cn.MesaId,
                    ValorComanda = cn.ValorComanda
                    
                }).FirstOrDefaultAsync();

            _ = comanda ?? throw new Exception("Comanda não localizada.");

            return await comanda;
        }
        public async Task CancelarComanda(int mesaId)
        {
            var comanda = await _contexto.Comanda
              .FirstOrDefaultAsync(c => c.MesaId == mesaId);

            _ = comanda ?? throw new Exception("Comanda não localizada.");

            comanda.Pago = true;

            comanda.ValorComanda = 0;

            comanda.DataHoraSaida = DateTime.Now;

            await _mesaService.DesocuparMesa(comanda.MesaId);

            await _contexto.SaveChangesAsync();
        }
        public async Task<ComandaModel> BuscarPedidosComanda(int mesaId)
        {
            var comanda = await _contexto.Comanda
                .Where(c => c.MesaId == mesaId && c.Pago == false)
                .Include(p => p.Pedidos)
                .ThenInclude(p => p.Status)
                .Include(p => p.Pedidos)
                .ThenInclude(p => p.Produto)
                .OrderBy(p => p.ComandaId)
                .Select(cf => new
                {
                    cf.ComandaId,
                    cf.DataHoraEntrada,
                    cf.DataHoraSaida,
                    cf.MesaId,
                    cf.QuantidadeClientes,
                    cf.ValorComanda,
                    cf.Pedidos,
                    cf.Pago
                }).FirstOrDefaultAsync();

            _ = comanda ?? throw new Exception("Comanda não localizada.");

            var cModel = new ComandaModel
            {
                ComandaId = comanda.ComandaId,
                DataHoraEntrada = comanda.DataHoraEntrada,
                DataHoraSaida = comanda.DataHoraSaida,
                MesaId = comanda.MesaId,
                Pago = comanda.Pago,
                QuantidadeClientes = comanda.QuantidadeClientes,
                ValorComanda = comanda.ValorComanda,

            };

           cModel.Pedidos = comanda.Pedidos
                 .Select(p => new PedidoModel
                 {
                     PedidoId = p.PedidoId,
                     PedidoValor = p.PedidoValor,
                     ProdutoId = p.ProdutoId,
                     ProdutoNome = p.Produto.Nome,
                     QuantidadeProduto = p.QuantidadeProduto,
                     StatusId = p.StatusId
                 }).ToList();

            return cModel;
        }
        public async Task<bool> SaveChangeAsync()
        {
            return (await _contexto.SaveChangesAsync()) > 0;
        }
    }
}

