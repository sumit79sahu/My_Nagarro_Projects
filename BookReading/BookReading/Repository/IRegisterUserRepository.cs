using BookReading.Models;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace BookReading.Repository
{
    public interface IRegisterUserRepository
    {
        Task<IdentityResult> CreateUserAsync(UserModel user);
        Task<SignInResult> PasswordLogInAsync(LoginModel user);
        Task SignOutAsync();
    }
}