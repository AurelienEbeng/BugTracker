using AutoMapper;
using backend.Core.Context;
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
            ApplicationDBContext context, RoleManager<Role> roleManager,
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


        [HttpPost]
        [Route("AddRoleToEmployee")]
        public async Task<ActionResult> AddRoleToEmployee(UserRoleCreateForm userRole)
        {

            Employee user = await _employeeManager.FindByIdAsync(userRole.userId);
            await _employeeManager.AddToRoleAsync(user, userRole.roleName);

            return Ok("Role Added");
        }



        //Read
        [HttpGet]
        [Route("GetEmployees")]
        public async Task<ActionResult> GetEmployees()
        {
            return Ok(await _context.Users.ToListAsync());
        }

        [HttpGet]
        [Route("GetManageUserRolesData")]
        public async Task<ActionResult> GetManageUserRolesData()
        {

            //var model = await _context.UserRoles.ToListAsync();


            var model = from e in _context.Employees
                        from ur in _context.UserRoles
                        from r in _context.Roles
                        where e.Id == ur.UserId
                        where ur.RoleId == r.Id
                        select new
                        {
                            username = e.UserName,
                            email = e.Email,
                            roleName = r.Name,
                        };




            return Ok(model);
        }


        //Update
        


        //Delete

    }


    

}
