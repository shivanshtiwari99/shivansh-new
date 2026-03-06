using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ecomm.Domain.Entities
{
    public class UpdateUser
    {
        public int u_id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public long password { get; set; }
        public string mobile { get; set; }
        public DateTime dob { get; set; }
        public string gender { get; set; }
    }
}
