using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ecomm.Domain.Entities
{
    public class Login
    {
        public int l_id { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string? role { get; set; }
    }
}
