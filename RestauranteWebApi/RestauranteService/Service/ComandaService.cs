using Microsoft.EntityFrameworkCore;
using RestauranteDominio;
using RestauranteService.Service.ComandaModel;
using System;
using System.Linq;
using System.Threading.Tasks;
using RestauranteService.Service.PedidoModel;
using RestauranteService.Service.Model.ComandaModel;
using RestauranteDominio.Enum;

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

        public async Task<int> Iniciar(AberturaModel model)
        {
            model.Validar();

            await _mesaService.OcuparMesa(model.MesaId);

            double valor = 80.0 * model.QuantidadeClientes;

            var comanda = new Comanda
            {
                DataHoraEntrada = DateTime.Now,
                MesaId = model.MesaId,
                QuantidadeClientes = model.QuantidadeClientes,
                ValorComanda = valor,
                QuantidadePedidos = model.QuantidadeClientes,
                Cancelada = false,
                Pago = false,
            };

            _contexto.Add(comanda);

            await _contexto.SaveChangesAsync();

            return comanda.ComandaId;
        }

        public async Task Fechar(int comandaId)
        {

            var comanda = await _contexto
                .Comanda
                .Where(c => c.ComandaId == comandaId)
                .OrderBy(c => c.ComandaId)
                .FirstOrDefaultAsync();

            _ = comanda ?? throw new Exception("Comanda não localizada.");

            comanda.Pago = true;

            comanda.DataHoraSaida = DateTime.Now;

            await _mesaService.DesocuparMesa(comanda.MesaId);

            await _contexto.SaveChangesAsync();
        }

        public async Task Cancelar(int comandaId)
        {

            var comanda = await _contexto
                .Comanda
                .OrderBy(c => c.ComandaId)
                .FirstOrDefaultAsync(c => c.ComandaId == comandaId && c.Pedidos.Count == 0 && c.Pago == false);

            _ = comanda ?? throw new Exception("Comanda não localizada.");

            comanda.Cancelada = true;

            comanda.Pago = true;

            comanda.ValorComanda = 0;

            comanda.DataHoraSaida = DateTime.Now;

            await _mesaService.DesocuparMesa(comanda.MesaId);

            await _contexto.SaveChangesAsync();
        }

        public async Task<ModelPaga> BuscarCompleta(int comandaId)
        {

            var comanda = await _contexto
                .Comanda
                .Where(c => c.ComandaId == comandaId)
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

            var modelPaga = new ModelPaga
            {
                ComandaId = comanda.ComandaId,
                DataHoraEntrada = comanda.DataHoraEntrada,
                MesaId = comanda.MesaId,
                Pago = comanda.Pago,
                QuantidadeClientes = comanda.QuantidadeClientes,
                ValorComanda = comanda.ValorComanda,
                DataHoraSaida = comanda.DataHoraSaida
                

            };

            modelPaga.Pedidos = comanda
                  .Pedidos
                  .Select(p => new ListarModel
                  {
                      PedidoId = p.PedidoId,
                      PedidoValor = p.PedidoValor,
                      ProdutoId = p.ProdutoId,
                      ProdutoNome = p.Produto.Nome,
                      QuantidadeProduto = p.QuantidadeProduto,
                      StatusEnum = p.StatusEnum
                  })
                  .ToList();

            return modelPaga;
        }
    }
}

