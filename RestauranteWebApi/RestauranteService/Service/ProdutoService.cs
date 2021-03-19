using Microsoft.EntityFrameworkCore;
using RestauranteService.Service.ProdutoModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestauranteService.Service
{
   public class ProdutoService 
    {
        private readonly RestauranteContexto _contexto;

        public ProdutoService(RestauranteContexto contexto)
        {
            _contexto = contexto;
        }

        public async Task<List<ListarDisponivelModel>> MostrarProdutosDisponiveis()
        {
            var listaProdutos = await _contexto.Produto
                .Where(p => p.Disponivel == true)
                .Select(np => new ListarDisponivelModel
            {
                Nome = np.Nome,
                ProdutoId = np.ProdutoId,
                Valor = np.Valor
            }).ToListAsync();

            _ = listaProdutos ?? throw new Exception("Produtos não Encontrados.");

            return listaProdutos;
        }
    }
}
