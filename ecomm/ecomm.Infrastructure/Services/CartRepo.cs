
using ecomm.Domain.Entities;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ecomm.Application.Interfaces;

namespace ecomm.Infrastructure.Services
{
    public class CartRepo : ICartServices
    {
        private readonly string? _connectionString;

        public CartRepo(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public int AddToCart(CartItems item)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                using SqlCommand cmd = new SqlCommand("sp_CartOperations", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@action", 1);
                cmd.Parameters.AddWithValue("@cart_id", item.CartId);
                cmd.Parameters.AddWithValue("@p_id", item.ProductId);
                cmd.Parameters.AddWithValue("@quantity", item.Quantity);
                cmd.Parameters.AddWithValue("@price", item.Price);

                con.Open();
                int res = cmd.ExecuteNonQuery();
                return res;
            }
        }
        public int AddCart(Cart cart)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                using SqlCommand cmd = new SqlCommand("sp_cart", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@action", 1);
                cmd.Parameters.AddWithValue("@u_id", cart.u_id);
                con.Open();
                int res = cmd.ExecuteNonQuery();
                return res; 
            }
        }
    }
}
