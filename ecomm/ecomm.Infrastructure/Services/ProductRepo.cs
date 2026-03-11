using ecomm.Application.Interfaces;
using ecomm.Domain.Entities;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ecomm.Infrastructure.Services
{
    public class ProductRepo : IProductServices
    {
        private readonly string? _connectionString;

        public ProductRepo(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public void AddProduct(Product prod)
        {
            using(SqlConnection con = new SqlConnection(_connectionString))
            {
                SqlCommand cmd = new SqlCommand("sp_product", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@action", 1);
                cmd.Parameters.AddWithValue("@p_name",prod.p_name);
                cmd.Parameters.AddWithValue("@c_id",prod.c_id);
                cmd.Parameters.AddWithValue("@p_price",prod.p_price);
                cmd.Parameters.AddWithValue("@p_desc",prod.p_desc);
                cmd.Parameters.AddWithValue("@p_picture",prod.p_picture);
                con.Open();
                cmd.ExecuteNonQuery();
            }
        }

        public void UpdateProduct(UpdateProduct upmod)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                SqlCommand cmd = new SqlCommand("sp_product", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@action", 5);
                cmd.Parameters.AddWithValue("@p_id", upmod.p_id);
                cmd.Parameters.AddWithValue("@p_name", upmod.p_name);
                cmd.Parameters.AddWithValue("@c_id", upmod.c_id);
                cmd.Parameters.AddWithValue("@p_price", upmod.p_price);
                cmd.Parameters.AddWithValue("@p_desc", upmod.p_desc);
                cmd.Parameters.AddWithValue("@p_picture", upmod.p_picture);
                con.Open();
                cmd.ExecuteNonQuery();
            }
        }
        public List<Product> AllProduct()
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                using SqlCommand cmd = new SqlCommand("sp_product", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@action", 3);
                con.Open();
                using SqlDataReader reader = cmd.ExecuteReader();
                List<Product> prod = new List<Product>();
                while (reader.Read())
                {
                    Product Products = new Product();
                    Products.c_id = Convert.ToInt32(reader["c_id"]);
                    Products.p_id = Convert.ToInt32(reader["p_id"]);
                    Products.p_price = Convert.ToInt32(reader["p_price"]);
                    Products.p_name = reader["p_name"].ToString();
                    Products.p_desc = reader["description"].ToString();
                    Products.p_picture = reader["p_picture"].ToString();
                    Products.c_name = reader["c_name"].ToString();
                    prod.Add(Products);
                }
                return prod;
            }
        }

        public List<Product> CategProduct(int? cid)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                SqlCommand cmd = new SqlCommand("sp_product", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@action", 2);
                cmd.Parameters.AddWithValue("@c_id",cid);
                con.Open();
                List<Product> prod = new List<Product>();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read()) 
                {
                    Product produ = new Product();
                    produ.p_name = reader["p_name"].ToString();
                    produ.p_desc = reader["description"].ToString();
                    produ.p_picture = reader["p_picture"].ToString();
                    produ.p_price = Convert.ToInt32(reader["p_price"]);
                    produ.p_id = Convert.ToInt32(reader["p_id"]);
                    produ.c_id = Convert.ToInt32(reader["c_id"]);
                    prod.Add(produ);
                }
                return prod;
            }
        }

        public List<Product> GetProductById(int? pid)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                SqlCommand cmd = new SqlCommand("sp_product", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@action", 6);
                cmd.Parameters.AddWithValue("@p_id", pid);
                con.Open();
                List<Product> prod = new List<Product>();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    Product produ = new Product();
                    produ.p_id = Convert.ToInt32(reader["p_id"]);
                    produ.p_name = reader["p_name"].ToString();
                    produ.p_desc = reader["description"].ToString();
                    produ.p_picture = reader["p_picture"].ToString();
                    produ.p_price = Convert.ToInt32(reader["p_price"]);
                    produ.c_id = Convert.ToInt32(reader["c_id"]);
                    produ.c_name = reader["c_name"].ToString();
                    prod.Add(produ);
                }
                return prod;
            }
        }
        public void DeleteProduct(int? pid)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                SqlCommand cmd = new SqlCommand("sp_product", con);
                
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@action", 4);
                cmd.Parameters.AddWithValue("@p_id", pid);
                con.Open();
                cmd.ExecuteNonQuery();
            }
        }
    }
}
