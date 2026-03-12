using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ecomm.Domain.Entities
{
    public class Order
    {
        public int order_id { get; set; }
        public int u_id { get; set; }
        public DateTime order_date { get; set; }
        public int total_amount { get; set; }
        public string status { get; set; }

    }
}
