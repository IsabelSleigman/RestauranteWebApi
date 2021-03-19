﻿using Microsoft.EntityFrameworkCore;
using RestauranteDominio;
using RestauranteService.Service.MesaModel;
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

        public async Task<List<ListarIdModel>> BuscarMesasDisponiveis()
        {
            var mesa = await _contexto.Mesa
                 .Where(m => m.Disponivel)
                 .Select(m => new ListarIdModel
                 {
                     MesaId = m.MesaId,
                     Disponivel = m.Disponivel
                 }).ToListAsync();
            return mesa;
        }

        public async Task<Mesa> OcuparMesa(int mesaId)
        {

            var mesa = await _contexto.Mesa
           .Where(m => m.MesaId == mesaId && m.Disponivel == true)
           .FirstOrDefaultAsync();

            _ = mesa ?? throw new Exception("Mesa não encontrada");

            mesa.Disponivel = false;

            await _contexto.SaveChangesAsync();

            return mesa;
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
    }
}