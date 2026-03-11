using ecomm.Application.Interfaces;
using ecomm.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using AspNetCoreGeneratedDocument;

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
        private readonly ICartServices _cart;

        public UserApiController(IUserServices user,ICategoryServies categ,IProductServices prod,ICartServices cart)
        {
            _user = user;
            _categ = categ;
            _prod = prod;
            _cart = cart;
            
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

        // cartapi

        [HttpPost("addtocart")]
        public IActionResult AddToCart(int u_id, int p_id, int quantity)
        {
            int res=_cart.AddToCart(u_id, p_id, quantity);
            return Ok(res);
        }

        [HttpGet("getcart")]
        public IActionResult GetCart(int u_id)  
        {
            var cart = _cart.GetCart(u_id);
            return Ok(cart);
        }

        [HttpDelete("removecart")]
        public IActionResult RemoveFromCart(int cartitem_id)
        {
            _cart.RemoveFromCart(cartitem_id);
            var cart = true;
            return Ok(cart);
        }
        [HttpPut("updatecartqty")]
        public IActionResult UpdateCartQty(int cartitem_id, int qty)
        {
            int res=_cart.UpdateCartQty(cartitem_id, qty);

            return Ok(res);
        }

    }
}
