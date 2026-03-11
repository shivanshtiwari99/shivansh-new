using ecomm.Application.Interfaces;
using ecomm.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ecomm.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    
    public class HomeApiController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUserServices _user;

        public HomeApiController(IUserServices user,IConfiguration configuration)
        {
            _configuration = configuration;
            _user = user;
        }
        [HttpPost("Register")]
        public IActionResult Register([FromBody] User_Reg user)
        {
            int res=_user.AddUser(user);
            return Ok(res);
        }
        [HttpPost("Login")]
        public IActionResult Login([FromBody] Login list)
        {
            var userData = _user.Login(list); 

            if (userData.Count == 0)
                return BadRequest("Invalid Email Or Password");

            var role = userData[0].role ?? "User";
            
            var claims = new[]
            {
        new Claim(System.Security.Claims.ClaimTypes.Email, list.email),
        new Claim(System.Security.Claims.ClaimTypes.Role, role)
    };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _configuration["Jwt:Key"])); // Inject IConfiguration in controller
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(Convert.ToDouble(_configuration["Jwt:DurationInMinutes"])),
                signingCredentials: creds
            );

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                role = role
            });
        }
    }
}
