using ecomm.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ecomm.Application.Interfaces
{
    public interface ICategoryServies
    {
        void AddCategory(Category categ);
        List<Category> AllCategory();
        void DeleteCategory(int? cid);
        List<Category> GetCategById(int? cid);
        void UpdateCategory(UpdateCategory ucmod);
    }
}
