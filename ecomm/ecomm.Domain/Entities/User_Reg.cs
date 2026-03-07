using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace ecomm.Domain.Entities
{
    public class User_Reg
    {
        public int? u_id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public int password { get; set; }  
        public string mobile { get; set; }
        public DateTime? dob { get; set; }
        public string gender { get; set; }
        public string? Role { get; set; } = "User";
    }
}
