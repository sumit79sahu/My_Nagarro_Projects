using BAL.Models;
using DAL.Helper;
using DAL.Repository.classes;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CampBooking.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationRepository _auth;
        public AuthenticationController(IAuthenticationRepository auth) 
        {
            _auth = auth;
        }
        [HttpPost]
        public string VerifyAdmin(AdminModel admin)
        {
            var adminModel = _auth.Verify(admin.Admin_Email);
            if (adminModel == null)
            {
                return "invalid";
            }
            else
            {
                if (PasswordHasher.verifyPassword(admin.Admin_Password, adminModel.Admin_Password))
                {
                    var Token = CreateJWT(adminModel);
                    return Token;
                }
                else
                {
                    return "invalid";
                }
            }

        }

        private string CreateJWT(AdminModel admin)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes("assignment done by sumit sahu"));
            var claims = new Claim[]
            {
                new Claim(ClaimTypes.Name,admin.Admin_Name),
                new Claim(ClaimTypes.NameIdentifier,admin.Admin_Email)

            };

            var signingCredentials = new SigningCredentials(
                key, SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = signingCredentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
