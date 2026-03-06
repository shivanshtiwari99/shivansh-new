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
    public class CategoryRepo:ICategoryServies
    {
        private readonly string? _connectionString;

        public CategoryRepo(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        
        public List<Category> AllCategory()
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                using SqlCommand cmd = new SqlCommand("sp_categ", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@action", 2);
                con.Open();
                using SqlDataReader reader = cmd.ExecuteReader();
                List<Category> categories = new List<Category>();
                while (reader.Read())
                {
                    Category category = new Category();
                    category.c_id = Convert.ToInt32(reader["c_id"]);
                    category.c_name = reader["c_name"].ToString();
                    category.c_picture = reader["c_picture"].ToString();
                    categories.Add(category);
                }
                return categories;
            }
        }

        public List<Category> GetCategById(int? cid)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                using SqlCommand cmd = new SqlCommand("sp_categ", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@action", 4);
                cmd.Parameters.AddWithValue("@c_id", cid);
                con.Open();
                using SqlDataReader reader = cmd.ExecuteReader();
                List<Category> categories = new List<Category>();
                while (reader.Read())
                {
                    Category category = new Category();
                    category.c_id = Convert.ToInt32(reader["c_id"]);
                    category.c_name = reader["c_name"].ToString();
                    category.c_picture = reader["c_picture"].ToString();
                    categories.Add(category);
                }
                return categories;
            }
        }
        public void AddCategory(Category categ)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                using SqlCommand cmd = new SqlCommand("sp_categ", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@action", 1);
                cmd.Parameters.AddWithValue("@c_name", categ.c_name);
                cmd.Parameters.AddWithValue("@c_picture", categ.c_picture);
                con.Open();
                cmd.ExecuteNonQuery();
            }
        }

        public void UpdateCategory(UpdateCategory ucmod)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                using SqlCommand cmd = new SqlCommand("sp_categ", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@action", 5);
                cmd.Parameters.AddWithValue("@c_id", ucmod.c_id);
                cmd.Parameters.AddWithValue("@c_name", ucmod.c_name);
                cmd.Parameters.AddWithValue("@c_picture", ucmod.c_picture);
                con.Open();
                cmd.ExecuteNonQuery();
            }
        }
        public void DeleteCategory(int? cid)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                SqlCommand cmd = new SqlCommand("sp_categ",con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@action", 3);
                cmd.Parameters.AddWithValue("@c_id", cid);
                con.Open();
                cmd.ExecuteNonQuery();
            }
        }
    }
}
