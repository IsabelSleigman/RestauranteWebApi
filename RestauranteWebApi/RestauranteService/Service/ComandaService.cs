using Microsoft.EntityFrameworkCore;
using RestauranteDominio;
using RestauranteService.Service.ComandaModel;
using System;
using System.Linq;
using System.Threading.Tasks;
using RestauranteService.Service.PedidoModel;

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
            if (quantidade <= 0 && quantidade >= 5)
            {
                throw new Exception("Comanda já está em uso ou quantidade de pessoas não está correta!");
            }
            double valor = 80.0 * quantidade;

            var mesa = await _mesaService.OcuparMesa(mesaId);

            _contexto.Add(new Comanda
            {
                DataHoraEntrada = DateTime.Now,
                DataHoraSaida = null,
                MesaId = mesaId,
                QuantidadeClientes = quantidade,
                Mesa = mesa,
                ValorComanda = valor,
                Pago = false,
            });

            await _contexto.SaveChangesAsync();
        }

        public async Task FecharComanda(int comandaId)
        {
            var comanda = await _contexto.Comanda
                .Where(c => c.ComandaId == comandaId)
                .OrderBy(c => c.ComandaId)
              .FirstOrDefaultAsync();

            _ = comanda ?? throw new Exception("Comanda não localizada.");

            comanda.Pago = true;

            comanda.DataHoraSaida = DateTime.Now;

            await _mesaService.DesocuparMesa(comanda.MesaId);

            await _contexto.SaveChangesAsync();
        }

        public async Task<BuscarModel> BuscarComanda(int mesaId)
        {
            var model = await _contexto.Comanda
                .Where(c => c.MesaId == mesaId)
                 .OrderBy(c => c.ComandaId)
                .Select(cn => new BuscarModel
                {
                    ComandaId = cn.ComandaId,
                    DataHoraEntrada = cn.DataHoraEntrada,
                    MesaId = cn.MesaId,
                    ValorComanda = cn.ValorComanda
                }).FirstOrDefaultAsync();

            _ = model ?? throw new Exception("Comanda não localizada.");

            return model;
        }
        public async Task CancelarComanda(int comandaId)
        {
            var comanda = await _contexto.Comanda
               .OrderBy(c => c.ComandaId)
              .FirstOrDefaultAsync(c => c.ComandaId == comandaId && c.Pedidos == null && c.Pago == false);

            _ = comanda ?? throw new Exception("Comanda não localizada.");

            comanda.Pago = true;

            comanda.ValorComanda = 0;

            comanda.DataHoraSaida = DateTime.Now;

            await _mesaService.DesocuparMesa(comanda.MesaId);

            await _contexto.SaveChangesAsync();
        }
        public async Task<ModelPaga> BuscarPedidos(int comandaId)
        {
            var comanda = await _contexto.Comanda
                .Where(c => c.ComandaId == comandaId)
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

            var model = new ModelPaga
            {
                ComandaId = comanda.ComandaId,
                DataHoraEntrada = comanda.DataHoraEntrada,
                MesaId = comanda.MesaId,
                Pago = comanda.Pago,
                QuantidadeClientes = comanda.QuantidadeClientes,
                ValorComanda = comanda.ValorComanda,
                DataHoraSaida = comanda.DataHoraSaida

            };

            model.Pedidos = comanda.Pedidos
                  .Select(p => new ListarModel
                  {
                      PedidoId = p.PedidoId,
                      PedidoValor = p.PedidoValor,
                      ProdutoId = p.ProdutoId,
                      ProdutoNome = p.Produto.Nome,
                      QuantidadeProduto = p.QuantidadeProduto,
                      Status = p.Status
                  }).ToList();


            return model;
        }
    }
}

