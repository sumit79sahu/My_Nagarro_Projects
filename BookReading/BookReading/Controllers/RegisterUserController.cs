using BookReading.Repository;
using BookReading.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookReading.Controllers
{
    public class RegisterUserController : Controller
    {

        private readonly IRegisterUserRepository _registerUser;
        public RegisterUserController(IRegisterUserRepository registerUser)
        {
            _registerUser = registerUser;
        }

        [HttpGet]
        [Route("signup")]
        public IActionResult Signup()
        {
            return View();
        }

        [Route("signup")]
        [HttpPost]
        public async Task<IActionResult> Signup(UserModel user)
        {
            if (ModelState.IsValid)
            {
                var result = await _registerUser.CreateUserAsync(user);
                if (!result.Succeeded)
                {
                    foreach (var errorMessage in result.Errors)
                    {
                        ModelState.AddModelError("",errorMessage.Description);
                    }
                    return View(user);
                }
                return RedirectToAction("Login", "RegisterUser");
            }
            return View();
        }

        [Route("login")]
        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }

        [Route("login")]
        [HttpPost]
        public async Task<IActionResult> Login(LoginModel user)
        {
            if (ModelState.IsValid)
            {
                var result = await _registerUser.PasswordLogInAsync(user);
                if(result.Succeeded)
                {
                    return RedirectToAction("Index","Home");
                }
                ModelState.AddModelError("","Ivalid Email or Password");
            }
            return View(user);
        }

        [Route("logout")]
        [HttpGet]
        public async Task<IActionResult> Logout()
        {
            await _registerUser.SignOutAsync();
            return RedirectToAction("Index", "Home");
        }

    }
}
