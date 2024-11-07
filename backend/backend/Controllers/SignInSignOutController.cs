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
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _employeeManager;
        private readonly IAuthService _authService;
        public SignInSignOutController(SignInManager<User>
            signInManager, UserManager<User> userManager,
            ApplicationDBContext context, RoleManager<Role> roleManager,
            IAuthService authService, 
            IMapper mapper)
        {
            _signInManager = signInManager;
            _employeeManager = userManager;
            _authService = authService;
        }




        [HttpPost]
        [Route("Login")]
        public async Task<object> LoginAsync([FromBody] Login submittedInfo)
        {
            var result = await _signInManager.PasswordSignInAsync(
                submittedInfo.Username!, submittedInfo.Password!,
                submittedInfo.RememberMe, false);
            if (result.Succeeded)
            {
                var userId = _employeeManager.GetUserId(HttpContext.User);
                EmployeeId.Id = userId.ToString();

                var tokenString = _authService.GenerateTokenString(submittedInfo);
                
                return new { tokenString, userId };


            }
            return "Unsuccess";
        }

        [HttpGet]
        [Route("Logout"),Authorize(Roles = "Admin,Developer,DemoAdmin,DemoDeveloper")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok("Logged out");
        }


    }
}
