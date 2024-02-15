using AutoMapper;
using backend.Core.Context;
using backend.Core.DataTransfer;
using backend.Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles ="Admin")]
    public class EmployeeController : ControllerBase
    {
        private readonly SignInManager<Employee> _signInManager;
        private readonly UserManager<Employee> _employeeManager;
        private ApplicationDBContext _context { get; }

        public static string employeeId;
        public EmployeeController(SignInManager<Employee>
            signInManager, UserManager<Employee> userManager,
            ApplicationDBContext context, RoleManager<IdentityRole> roleManager,
            IMapper mapper)
        {
            _signInManager = signInManager;
            _context = context;
            _employeeManager = userManager;
        }


        //CRUD
        //Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Create(CreateEmployeeForm submittedInfo)
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


            return Ok("Error");
        }



        //Read
        [HttpGet]
        [Route("GetEmployees")]
        public async Task<ActionResult> GetEmployees()
        {
            return Ok(await _context.Users.ToListAsync());
        }


        

        //Update
        [HttpGet]
        [Route("AddRoleToEmployee")]
        public async Task<ActionResult> AddRoleToEmployee(string roleName, string userId)
        {
            Employee user = await _employeeManager.FindByIdAsync(userId);
            await _employeeManager.AddToRoleAsync(user, roleName);
            return Ok("Role Added");
        }


        //Delete

    }


    

}
