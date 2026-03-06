using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ecomm.Controllers
{
    //[Authorize(Roles = "user")]
    public class UserController : Controller
    {

        public IActionResult Home()
        {
            return View();
        }
        public IActionResult Category()
        {
            return View();
        }
        public IActionResult Product()
        {
            return View();
        }
        public IActionResult CategoryProduct()
        {
            return View();
        }
        public IActionResult Profile()
        {
            return View();
        }
        public IActionResult Cart()
        {
            return View();
        }
        public IActionResult Logout()
        {
            return RedirectToAction("login", "home");
        }
    }
}
