using ecomm.Application.Interfaces;
using ecomm.Domain.Entities;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ecomm.Infrastructure.Services
{
    public class OrderRepo : IOrderServices
    {
        private readonly string? _connectionString;

        public OrderRepo(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public int PlaceOrder(int u_id)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                SqlCommand cmd = new SqlCommand("sp_order", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@u_id", u_id);
                cmd.Parameters.AddWithValue("@action", 1);

                con.Open();
                int res = cmd.ExecuteNonQuery();
                return res;
            }
        }

        public List<Order> GetOrders(int u_id)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                SqlCommand cmd = new SqlCommand("sp_order", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@u_id", u_id);
                cmd.Parameters.AddWithValue("@action", 2);

                con.Open();

                SqlDataReader reader = cmd.ExecuteReader();

                List<Order> orders = new List<Order>();

                while (reader.Read())
                {
                    Order o = new Order();

                    o.order_id = Convert.ToInt32(reader["order_id"]);
                    o.u_id = Convert.ToInt32(reader["u_id"]);
                    o.order_date = Convert.ToDateTime(reader["order_date"]);
                    o.total_amount = Convert.ToInt32(reader["total_amount"]);
                    o.status = reader["status"].ToString();

                    orders.Add(o);
                }

                return orders;
            }
        }

        public List<OrderItems> GetOrderItems(int order_id)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                SqlCommand cmd = new SqlCommand("sp_order", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@order_id", order_id);
                cmd.Parameters.AddWithValue("@action", 3);

                con.Open();

                SqlDataReader reader = cmd.ExecuteReader();

                List<OrderItems> items = new List<OrderItems>();

                while (reader.Read())
                {
                    OrderItems oi = new OrderItems();

                    oi.orderitem_id = Convert.ToInt32(reader["orderitem_id"]);
                    oi.p_id = Convert.ToInt32(reader["p_id"]);
                    oi.quantity = Convert.ToInt32(reader["quantity"]);
                    oi.price = Convert.ToInt32(reader["price"]);
                    oi.p_name = reader["p_name"].ToString();
                    oi.p_picture = reader["p_picture"].ToString();
                    //oi.status = reader["status"].ToString();

                    items.Add(oi);
                }

                return items;
            }
        }
        public int CancelOrder(int order_id)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {

                SqlCommand cmd = new SqlCommand("sp_order", con);

                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@order_id", order_id);
                cmd.Parameters.AddWithValue("@action", 4);

                con.Open();

                int res = cmd.ExecuteNonQuery();

                return res;
            }
        }

    }
}
