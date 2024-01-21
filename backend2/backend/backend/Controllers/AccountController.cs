using AutoMapper;
using backend.Data;
using backend.Dtos.Employee;
using backend.Models;
using backend.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpLogging;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private backendContext _context { get; }
        private readonly SignInManager<Employee> _signInManager;
        private readonly UserManager<Employee> _employeeManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private IMapper _mapper { get; set; }

        public AccountController(SignInManager<Employee>
            signInManager, UserManager<Employee> userManager,
            backendContext context,RoleManager<IdentityRole> roleManager,
            IMapper mapper)
        {
            _signInManager = signInManager;
            _context = context;
            _employeeManager = userManager;
            _roleManager = roleManager;
            _mapper = mapper;
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
        [Route("Register"),Authorize(Roles = "Admin")]
        public async Task<IActionResult> Register(RegisterVM submittedInfo)
        {
            Employee user = new()
            {
                Name = submittedInfo.Name,
                UserName = submittedInfo.Email,
                Email = submittedInfo.Email
            };
            var result = await _employeeManager.CreateAsync(user, submittedInfo.Password);

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


        [HttpGet]
        [Route("AddRoleToUser"),Authorize(Roles = "Admin")]
        public async Task<ActionResult> AddRoleToUser(string roleName,string userId)
        {
            Employee user = await _employeeManager.FindByIdAsync(userId);
            await _employeeManager.AddToRoleAsync(user, roleName);
            return Ok("Role Added");
        }

        [HttpGet]
        [Route("GetEmployees"), Authorize(Roles ="Admin")]
        public async Task<ActionResult> GetEmployees()
        {
            return Ok(await _context.Users.ToListAsync());
        }

        [HttpGet]
        [Route("GetCurrentLoggedInEmployeeId")]
        public async Task<ActionResult> GetCurrentLoggedInEmployeeId()
        {
            
            return Ok( _employeeManager.GetUserId(HttpContext.User));
        }

    }
}
 