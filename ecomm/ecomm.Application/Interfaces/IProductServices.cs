using ecomm.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ecomm.Application.Interfaces
{
    public interface IProductServices
    {
        void AddProduct(Product prod);
        List<Product> AllProduct();
        List<Product> CategProduct(int? cid);
        List<Product> GetProductById(int? pid);
        void DeleteProduct(int? pid);
        void UpdateProduct(UpdateProduct upmod);
    }
}
