using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestauranteService.Service
{
    public class MesaService 
    {
        private readonly RestauranteContexto _contexto;

        public MesaService(RestauranteContexto contexto)
        {
            _contexto = contexto;
        }

        public async Task<List<int>> BuscarMesasDisponiveis()
        {
            return await _contexto.Mesa
                 .Where(m => m.Disponivel)
                 .Select(m => m.MesaId)
                 .ToListAsync();
        }

        public async Task OcuparMesa(int mesaId)
        {
            {
                var mesa = await _contexto.Mesa
               .Where(m => m.MesaId == mesaId && m.Disponivel == true)
               .FirstOrDefaultAsync();

                _ = mesa ?? throw new Exception("Mesa não encontrada");

                mesa.Disponivel = false;

                await _contexto.SaveChangesAsync();
            }
        }

        public async Task DesocuparMesa(int mesaId)
        {
            var mesa = await _contexto.Mesa
           .Where(m => m.MesaId == mesaId && m.Disponivel == false)
           .FirstOrDefaultAsync();

            _ = mesa ?? throw new Exception("Mesa não encontrada");

            mesa.Disponivel = true;

            await _contexto.SaveChangesAsync();
        }

        public async Task<bool> SaveChangeAsync()
        {
            return (await _contexto.SaveChangesAsync()) > 0;
        }
    }
}