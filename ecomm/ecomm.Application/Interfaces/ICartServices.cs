using ecomm.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ecomm.Application.Interfaces
{
    public interface ICartServices
    {
        int AddToCart(int u_id, int p_id, int quantity);
        List<CartItems> GetCart(int u_id);
        void RemoveFromCart(int cartitem_id);
        int UpdateCartQty(int cartitem_id, int qty);
        
    }
}
