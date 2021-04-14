using Microsoft.EntityFrameworkCore;
using RestauranteService.Service.Model.FaturamentoModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestauranteService.Service
{
     public class FaturamentoService
    {

        private readonly RestauranteContexto _contexto;

        public FaturamentoService(RestauranteContexto contexto)
        {
            _contexto = contexto;
     
        }

        public async Task<List<ModelFechadasFaturamento>> ListarComandasFechadas()
        {

            var comandas = await _contexto
                .Comanda
                .Where(c => c.Pago == true)
                .OrderBy(c => c.ComandaId)
                .Include(p => p.Pedidos)
                .Select(cn => new ModelFechadasFaturamento
                {
                    ComandaId = cn.ComandaId,
                    DataHoraEntrada = cn.DataHoraEntrada,
                    DataHoraSaida = cn.DataHoraSaida,
                    QuantidadeClientes = cn.QuantidadeClientes,
                    ValorComanda = cn.ValorComanda,
                    QuantidadePedidos = cn.QuantidadePedidos,
                    Cancelada = cn.Cancelada,
                    Pago = cn.Pago
                })
                .ToListAsync();

            _ = comandas ?? throw new Exception("Comandas não localizadas.");

            return comandas;
        }

        public async Task<List<ModelAbertasFaturamento>> BuscarAbertasFaturamento()
        {
            var comandasAbertas = await _contexto
               .Comanda
               .Where(c => c.Pago == false)
               .OrderBy(c => c.ComandaId)
               .Select(cn => new ModelAbertasFaturamento
               {
                   ComandaId = cn.ComandaId,
                   MesaId = cn.MesaId,
                   DataHoraEntrada = cn.DataHoraEntrada,
                   QuantidadeClientes = cn.QuantidadeClientes,
                   ValorComanda = cn.ValorComanda,
                   QuantidadePedidos = cn.QuantidadePedidos,
                   Pago = cn.Pago
               })
               .ToListAsync();

            _ = comandasAbertas ?? throw new Exception("Comandas não localizadas.");

            return comandasAbertas;

        }

        public async Task<TotalFaturamentoModel> BuscaTotal()
        {
            var comandas = await ListarComandasFechadas();

            _ = comandas ?? throw new Exception("Comandas não localizadas.");

            var totalAtendimento = comandas.Count();

            var totalClientes = comandas.Select(c => c.QuantidadeClientes).Sum();

            var totalLucro = comandas.Select(t => t.ValorComanda).Sum();


            return new TotalFaturamentoModel
            {
                LucroTotal = totalLucro,
                QuantidadeAtentimento = totalAtendimento,
                QuantidadeCliente = totalClientes
            };
        }



    }
}
