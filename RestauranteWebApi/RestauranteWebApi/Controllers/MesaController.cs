﻿using Microsoft.AspNetCore.Mvc;
using RestauranteService.Service;
using System.Collections.Generic;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RestauranteWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MesaController : ControllerBase
    {
        // GET: api/<MesaController>
        private readonly MesaService _mesaService;

        public MesaController(MesaService mesaService)
        {
            _mesaService = mesaService;
        }

        // GET: MesaController
        [HttpGet("BuscaMesa", Name = "BuscarMesasDisponiveis")]
        public async Task<List<int>> BuscarMesasDisponiveis()
        {
            return await _mesaService.BuscarMesasDisponiveis();
        }

        // PUT api/<MesaController>/5
        [HttpPut("DesocuparMesa{mesaId}")]
        public async Task DesocuparMesa(int mesaId)
        {
            await _mesaService.DesocuparMesa(mesaId);
        }

        // DELETE api/<MesaController>/5
        [HttpPut("OcuparMesa{mesaId}")]
        public async Task OcuparrMesa(int mesaId)
        {
            await _mesaService.OcuparMesa(mesaId);
        }

    }
}
