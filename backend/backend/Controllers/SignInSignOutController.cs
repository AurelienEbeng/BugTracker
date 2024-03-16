using AutoMapper;
using backend.Core.Context;
using backend.Core.DataTransfer;
using backend.Core.Entities;
using backend.Core.Services;
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
        private readonly UserManager<Employee> _employeeManager;
        private readonly IAuthService _authService;
        public SignInSignOutController(SignInManager<Employee>
            signInManager, UserManager<Employee> userManager,
            ApplicationDBContext context, RoleManager<IdentityRole> roleManager,
            IAuthService authService, 
            IMapper mapper)
        {
            _signInManager = signInManager;
            _employeeManager = userManager;
            _authService = authService;
        }


        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> LoginAsync([FromBody] Login submittedInfo)
        {
            var result = await _signInManager.PasswordSignInAsync(
                submittedInfo.Username!, submittedInfo.Password!,
                submittedInfo.RememberMe, false);
            if (result.Succeeded)
            {
                var id = _employeeManager.GetUserId(HttpContext.User);
                EmployeeId.Id = id.ToString();

                var tokenString = _authService.GenerateTokenString(submittedInfo);
                return Ok($"{tokenString}");

                //return Ok($"Success");

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
