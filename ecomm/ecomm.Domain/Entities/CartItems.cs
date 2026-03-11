using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ecomm.Domain.Entities
{
    public class CartItems
    {
        public int cartitem_id { get; set; }
        public int cart_id { get; set; }
        public int p_id { get; set; }
        public int quantity { get; set; }
        public string? p_picture { get; set; }
        public string p_name { get; set; }
        public int p_price { get; set; }

    }
}
