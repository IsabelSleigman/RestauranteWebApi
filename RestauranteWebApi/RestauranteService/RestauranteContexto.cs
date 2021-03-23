using Microsoft.EntityFrameworkCore;
using RestauranteDominio;


namespace RestauranteService
{
   public class RestauranteContexto : DbContext
    {
        public RestauranteContexto(DbContextOptions<RestauranteContexto> optionsBuilder) : base(optionsBuilder) { }

        public DbSet<Comanda> Comanda { get; set; }
        public DbSet<Mesa> Mesa { get; set; }
        public DbSet<Pedido> Pedido { get; set; }
        public DbSet<Produto> Produto { get; set; }
   
    }
}
