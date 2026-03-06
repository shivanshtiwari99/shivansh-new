using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ecomm.Domain.Entities
{
    public class Category
    {
        public int c_id { get; set; }
        public string c_name { get; set; }
        public string? c_picture { get; set; }
    }
}
