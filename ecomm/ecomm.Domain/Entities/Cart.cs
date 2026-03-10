using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ecomm.Domain.Entities
{
    public class Cart
    {
        public int cart_id{ get; set; }
        public int u_id { get; set; }
        public DateTime c_date { get; set; }
    }
}
