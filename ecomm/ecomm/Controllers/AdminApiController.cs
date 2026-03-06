using ecomm.Application.Interfaces;
using ecomm.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
namespace ecomm.Controllers
{
    [Authorize(Roles ="admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminApiController : ControllerBase
    {
        private readonly IUserServices _user;
        private readonly ICategoryServies _categ;
        private readonly IProductServices _prod;

        public AdminApiController(IUserServices user,ICategoryServies categ, IProductServices prod)
        {
            _user = user;
            _categ = categ;
            _prod = prod;
        }
        
        
        [HttpGet("users")]
        public IActionResult AllUser()
        {
            var all_user = _user.GetUser();
            return Ok(all_user);
        }

        [HttpGet("iduser")]
        public IActionResult GetUserById(int? uid)
        {
            var id_user = _user.GetUserById(uid);
            return Ok(id_user);
        }
        [HttpPut("updateuser")]
        public IActionResult UpdateUser([FromBody] UpdateUser model)
        {
            _user.UpdateUser(model);
            return Ok("User Updated Successfully");
        }

        [HttpDelete("deleteUser")]
        public IActionResult DeleteUser([FromQuery] int? uid)
        {
            _user.DeleteUser(uid);
            return Ok("User Deleted Successfully");
        }
        [HttpGet("dashcount")]
        public IActionResult DashboardCount()
        {
            var data = new
            {
                totalUsers = _user.GetUser().Count,
                totalCategories = _categ.AllCategory().Count,
                totalProducts = _prod.AllProduct().Count
            };

            return Ok(data);
        }
        [HttpPost("addcategory")]

        //Category APIs 
        public IActionResult AddCategory([FromForm] Category categ, [FromForm] IFormFile imageFile)
        {
            if (imageFile != null && imageFile.Length > 0)
            {
                string folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/Photos/Category");

                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }

                string fileName = Path.GetFileName(imageFile.FileName);

                string fullPath = Path.Combine(folderPath, fileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    imageFile.CopyTo(stream);
                }

                categ.c_picture = "/Photos/Category/" + fileName;
            }
            _categ.AddCategory(categ);
            return Ok("Category Added Successfully");
        }

        [HttpPut("updatecategory")]
        public IActionResult UpdateCategory([FromForm] UpdateCategory model,[FromForm] IFormFile? file,[FromForm] string? oldImage)
        {
            string fileName = oldImage; 

            if (file != null)
            {
                string folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/Photos/Category");

                if (!Directory.Exists(folderPath))
                    Directory.CreateDirectory(folderPath);

                
                if (!string.IsNullOrEmpty(oldImage))
                {
                    string oldPath = Path.Combine(folderPath, oldImage);
                    if (System.IO.File.Exists(oldPath))
                        System.IO.File.Delete(oldPath);
                }

                fileName = Path.GetFileName(file.FileName);
                string newPath = Path.Combine(folderPath, fileName);

                using (var stream = new FileStream(newPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }
            }

            
            model.c_picture = "/Photos/Category/" + fileName;

            _categ.UpdateCategory(model);

            return Ok("Category Updated Successfully");
        }

        [HttpGet("categories")]
        public IActionResult AllCategory()
        {
            var all_categ = _categ.AllCategory();
            return Ok(all_categ);
        }
        [HttpGet("idcategory")]
        public IActionResult GetCategById([FromQuery] int? cid)
        {
            var id_categ = _categ.GetCategById(cid);
            if (id_categ == null)
                return NotFound();
            return Ok(id_categ);
        }
        [HttpDelete("deleteCateg")]
        public IActionResult DeleteCategory([FromQuery] int? cid)
        {
            _categ.DeleteCategory(cid);
            return Ok("Category Deleted Successfully");
        }

        //User APIs 
        [HttpPost("addproduct")]
        public IActionResult AddProduct([FromForm] Product prod, [FromForm] IFormFile imageFile)
        {
            if (imageFile != null && imageFile.Length > 0)
            {
                string folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/Photos/Product");

                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }

                string fileName = Path.GetFileName(imageFile.FileName);

                string fullPath = Path.Combine(folderPath, fileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    imageFile.CopyTo(stream);
                }

                prod.p_picture = "/Photos/Product/" + fileName;
            }
            _prod.AddProduct(prod);
            return Ok("Product Added Successfully");
        }

        [HttpPut("updateProduct")]
        public IActionResult UpdateProduct([FromForm] UpdateProduct model,IFormFile? imageFile)
        {
                string uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/photos/product");

                if (!Directory.Exists(uploadPath))
                    Directory.CreateDirectory(uploadPath);

                
                if (imageFile != null && imageFile.Length > 0)
                {
                    
                    string fileName = imageFile.FileName;

                    string filePath = Path.Combine(uploadPath, fileName);

                   
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        imageFile.CopyTo(stream);
                    }

                    model.p_picture ="/Photos/Product/"+ fileName; 
                }
                
                else
                {
                    
                }

                _prod.UpdateProduct(model);

                return Ok("Product Updated Successfully");
            }

        [HttpGet("products")]
        public IActionResult AllProduct()
        {
            var all_prod = _prod.AllProduct();
            return Ok(all_prod);
        }
        [HttpGet("idproduct")]
        public IActionResult GetProductById(int? pid)
        {
            var id_prod = _prod.GetProductById(pid);
            return Ok(id_prod);
        }
        [HttpDelete("deleteProd")]
        public IActionResult DeleteProduct([FromQuery] int? pid)
        {
            _prod.DeleteProduct(pid);
            return Ok("Product Deleted Successfully");
        }
        
    }
}
