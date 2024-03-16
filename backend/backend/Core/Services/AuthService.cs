using backend.Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backend.Core.Services
{
    public class AuthService : IAuthService
    {
        //private readonly UserManager<Employee> _employeeManager;
        private readonly IConfiguration _config;

        public AuthService(//UserManager<Employee> userManager, 
            IConfiguration config)
        {
            //_employeeManager = userManager;
            _config = config;
        }

        //public async Task<IActionResult> LoginAsync([FromBody] Login submittedInfo) { return Ok($"Success"); }

        public string GenerateTokenString(Login user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email,user.Username),
                new Claim(ClaimTypes.Role,"Admin"),
            };

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("Jwt:Key").Value));

            var signingCred = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha512Signature);

            var securityToken = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(60),
                issuer: _config.GetSection("Jwt:Issuer").Value,
                audience: _config.GetSection("Jwt:Audience").Value,
                signingCredentials: signingCred);

            string tokenString = new JwtSecurityTokenHandler().WriteToken(securityToken);
            return tokenString;
        }
    }
}
