using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace RestauranteDominio
{
   public class Status
    {
        [Key]
        public int StatusId { get; set; }
        public string Descricao { get; set; }
    }
}
