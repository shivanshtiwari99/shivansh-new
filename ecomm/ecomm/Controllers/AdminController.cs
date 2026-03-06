using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ecomm.Controllers
{
    //[Authorize(Roles = "admin")]    
    public class AdminController : Controller
    {
        public IActionResult Dashboard()
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
        public IActionResult Users()
        {
            return View();
        }
        public IActionResult AddCategory()
        {
            return View();
        }
        public IActionResult AddProduct()
        {
            return View();
        }
        public IActionResult Logout()
        {
            return RedirectToAction("login","home");
        }
        
    }
}
