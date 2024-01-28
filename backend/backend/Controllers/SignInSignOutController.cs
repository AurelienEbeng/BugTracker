using AutoMapper;
using backend.Core.Context;
using backend.Core.DataTransfer;
using backend.Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class SignInSignOutController : ControllerBase
    {
        private readonly SignInManager<Employee> _signInManager;
        public SignInSignOutController(SignInManager<Employee>
            signInManager, UserManager<Employee> userManager,
            ApplicationDBContext context, RoleManager<IdentityRole> roleManager,
            IMapper mapper)
        {
            _signInManager = signInManager;
            
        }


        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> LoginAsync(Login submittedInfo)
        {
            var result = await _signInManager.PasswordSignInAsync(
                submittedInfo.Username!, submittedInfo.Password!,
                submittedInfo.RememberMe, false);
            if (result.Succeeded)
            {
                return Ok("Success");
            }
            return Ok("Unsuccess");
        }

        [HttpGet]
        [Route("Logout"),Authorize(Roles = "Admin")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok("Logged out");
        }


    }
}
