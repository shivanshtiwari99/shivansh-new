using ecomm.Application.Interfaces;
using ecomm.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace ecomm.Controllers
{

    [Authorize(Roles = "user")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserApiController : ControllerBase
    {
        private readonly IUserServices _user;
        private readonly ICategoryServies _categ;
        private readonly IProductServices _prod;

        public UserApiController(IUserServices user,ICategoryServies categ,IProductServices prod)
        {
            _user = user;
            _categ = categ;
            _prod = prod;
            
        }

        
        [HttpGet("emailuser")]
        public IActionResult GetUserByEmail(string? email)
        {
            var id_user = _user.GetUserByEmail(email);
            return Ok(id_user);
        }
        [HttpPut("edituser")]
        public IActionResult EditUser([FromBody] UpdateUser model)
        {
            _user.EditUser(model);
            var user = true;
            return Ok(user);
        }

        [HttpGet("categories")]
        public IActionResult AllCategory()
        {
            var all_categ = _categ.AllCategory();
            return Ok(all_categ);
        }
        [HttpGet("products")]
        public IActionResult AllProduct()

        {
            var all_prod = _prod.AllProduct();
            return Ok(all_prod);
        }

        [HttpGet("categproducts")]
        public IActionResult CategProduct([FromQuery]int? cid)
        {
            var categ_prod = _prod.CategProduct(cid);
            return Ok(categ_prod);
        }
        
    }
}
