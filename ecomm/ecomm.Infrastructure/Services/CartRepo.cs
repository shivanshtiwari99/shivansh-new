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
    public class CartRepo : ICartServices
    {
        private readonly string? _connectionString;

        public CartRepo(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public int AddToCart(int u_id, int p_id, int quantity)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                SqlCommand cmd = new SqlCommand("sp_cart", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@u_id", u_id);
                cmd.Parameters.AddWithValue("@p_id", p_id);
                cmd.Parameters.AddWithValue("@quantity", quantity);
                cmd.Parameters.AddWithValue("@action", 1);

                con.Open();
                int res=cmd.ExecuteNonQuery();
                return res;
            }
        }

        public List<CartItems> GetCart(int u_id)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                SqlCommand cmd = new SqlCommand("sp_cart", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@u_id", u_id);
                cmd.Parameters.AddWithValue("@action", 2);

                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                List<CartItems> cart = new List<CartItems>();

                while (reader.Read())
                {
                    CartItems item = new CartItems();
                    item.cartitem_id = Convert.ToInt32(reader["cartitem_id"]);
                    item.cart_id = Convert.ToInt32(reader["cart_id"]);
                    item.p_id = Convert.ToInt32(reader["p_id"]);
                    item.quantity = Convert.ToInt32(reader["quantity"]);
                    item.p_name = reader["p_name"].ToString();
                    item.p_price = Convert.ToInt32(reader["p_price"]);
                    item.p_picture = reader["p_picture"].ToString();

                    cart.Add(item);
                }

                return cart;
            }
        }

        public void RemoveFromCart(int cartitem_id)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                SqlCommand cmd = new SqlCommand("sp_cart", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@cart_id", cartitem_id);
                cmd.Parameters.AddWithValue("@action", 3);

                con.Open();
                cmd.ExecuteNonQuery();
            }
        }
        public int UpdateCartQty(int cartitem_id, int qty)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                SqlCommand cmd = new SqlCommand("sp_cart", con);

                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@action", 4);
                cmd.Parameters.AddWithValue("@cart_id", cartitem_id);
                cmd.Parameters.AddWithValue("@quantity", qty);

                con.Open();
                int res=cmd.ExecuteNonQuery();
                return res;
            }
        }
    }
}
