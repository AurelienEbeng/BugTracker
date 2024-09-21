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
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _employeeManager;
        private ApplicationDBContext _context { get; }

        public static string employeeId;
        public EmployeeController(SignInManager<User>
            signInManager, UserManager<User> userManager,
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
        public async Task<IActionResult> Create(CreateUserForm submittedInfo)
        {
            User user = new()
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

            User user = await _employeeManager.FindByIdAsync(userRole.userId);
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


            var model = from e in _context.Users
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


        [HttpGet]
        [Route("GetUser")]
        public async Task<ActionResult> GetUser(string userId)
        {
            var user = from e in _context.Users
                        from ur in _context.UserRoles
                        from r in _context.Roles
                        where e.Id == ur.UserId && userId==e.Id
                        where ur.RoleId == r.Id 
                        select new
                        {
                            name = e.Name,
                            email = e.Email,
                            role = r.Name,
                            id=userId,
                            dateJoined = e.DateJoined
                        };

            return Ok(user.First());
        }


        //Update



        //Delete

    }


    

}
