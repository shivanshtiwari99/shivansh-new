using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ecomm.Domain.Entities
{
    public class OrderItems
    {
        public int orderitem_id { get; set; }
        public int order_id { get; set; }
        public int p_id { get; set; }
        public int quantity { get; set; }
        public int price { get; set; }
        public string p_name { get; set; }
        public string p_picture { get; set; }
        public string status { get; set; }
    }
}
