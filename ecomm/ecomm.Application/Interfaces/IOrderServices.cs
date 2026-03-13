using ecomm.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ecomm.Application.Interfaces
{
    public interface IOrderServices
    {
        int PlaceOrder(int u_id);
        List<Order> GetOrders(int u_id);
        List<OrderItems> GetOrderItems(int order_id);
        int CancelOrder(int order_id);
        List<Order> GetAllOrders();
        int UpdateOrderStatus(int order_id, string status);
    }
}
