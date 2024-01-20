using backend.Data;
using backend.Models;
using backend.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpLogging;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private backendContext _context { get; }
        private readonly SignInManager<Employee> _signInManager;
        private readonly UserManager<Employee> _userManager;

        public AccountController(SignInManager<Employee>
            signInManager, UserManager<Employee> userManager,
            backendContext context)
        {
            _signInManager = signInManager;
            _context = context;
            _userManager = userManager;
        }

        

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> LoginAsync(LoginVM submittedInfo)
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
        [Route("Logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok("Logged out");
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register(RegisterVM submittedInfo)
        {
            Employee user = new()
            {
                Name = submittedInfo.Name,
                UserName = submittedInfo.Email,
                Email = submittedInfo.Email
            };
            var result = await _userManager.CreateAsync(user, submittedInfo.Password);

            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, false);
                return Ok("Logged in");
            }

            //foreach (var error in result.Errors)
            //{
            //    ModelState.AddModelError("", error.Description);

            //}

            return Ok("Error");
        }
    }
}
