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
        int AddToCart(CartItems item);
        //int UpdateCartItem(CartItems item);
        //int DeleteCartItem(int cartItemId);
        //List<Cart> GetCartItems(int cartId);
    }
}
