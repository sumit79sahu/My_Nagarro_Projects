using BookReading.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookReading.Repository
{
    public class RegisterUserRepository : IRegisterUserRepository
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;


        public RegisterUserRepository(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;



        }
        public async Task<IdentityResult> CreateUserAsync(UserModel user)
        {
            var UserDetails = new ApplicationUser() { Email = user.Email, UserName = user.Email, FullName = user.FullName };
            var result = await _userManager.CreateAsync(UserDetails, user.Password);
            var roleExits = await _roleManager.RoleExistsAsync("User");
                if (!roleExits)
                {
                    await _roleManager.CreateAsync(new IdentityRole("User"));
                }
                _userManager.AddToRoleAsync(UserDetails, "User").Wait();
            return result;
        }

        public async Task<SignInResult> PasswordLogInAsync(LoginModel user)
        {
            var result = await _signInManager.PasswordSignInAsync(user.Email, user.Password, user.RemeberMe, false);
            return result;
        }

        public async Task SignOutAsync()
        {
            await _signInManager.SignOutAsync();
        }
    }
}



