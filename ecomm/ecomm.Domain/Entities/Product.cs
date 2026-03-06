using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ecomm.Domain.Entities
{
    public class Product
    {
        public int p_id { get; set; }
        public string p_name { get; set; }
        public int c_id { get; set; }
        public int p_price { get; set; }
        public string p_desc { get; set; }
        public string? c_name { get; set; }
        public string? p_picture { get; set; }
    }
}
