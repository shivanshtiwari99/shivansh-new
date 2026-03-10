using ecomm.Application.Interfaces;
using ecomm.Infrastructure.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ecomm.Domain.Entities;

namespace ecomm.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartApiController : ControllerBase
    {
        private readonly ICartServices _cart;

        public CartApiController(ICartServices cart)
        {
            _cart = cart;
        }
        [HttpPost("AddCartItmes")]
        public IActionResult AddToCart([FromBody] CartItems item)
        {
            _cart.AddToCart(item);
            
            return Ok("Product added to cart");
        }
        [HttpPost("AddCart")]
        public IActionResult AddCart([FromBody] Cart cart)
        {
            _cart.AddCart(cart);
            return Ok("Cart Created");
        }

    }
}
