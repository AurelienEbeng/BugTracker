using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.Email;
using backend.Core.Dtos.ForgotPassword;
using backend.Core.Entities;
using backend.Core.Services.EmailService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;

// I think a better name for this controller is AccountController or UserController.
// If you change the name of the Controller, you will lose the git changes

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private ApplicationDBContext _context { get; }
        private readonly IEmailService _emailService;
        
        public EmployeeController( UserManager<User> userManager,
            ApplicationDBContext context, RoleManager<Role> roleManager,
            IMapper mapper, IEmailService emailService)
        {
            _context = context;
            _userManager = userManager;
            _emailService = emailService;
        }


        //CRUD
        //Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Create(CreateUserForm submittedInfo)
        {
            var user = _context.Users.Where(u => u.Email == submittedInfo.Email).FirstOrDefault();
            if(user != null)
            {
                throw new Exception("That email is already taken");
            }
            
            User newUser = new()
            {
                Name = submittedInfo.Name,
                UserName = submittedInfo.Email,
                Email = submittedInfo.Email
            };
            var result = await _userManager.CreateAsync(newUser, submittedInfo.Password);

            if (result.Succeeded)
            {
                return Ok("User Created");
            }

            
            return Ok("Error");
        }


        [HttpPost]
        [Route("AddRoleToEmployee")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> AddRoleToEmployee(UserRoleCreateForm userRole)
        {

            User user = await _userManager.FindByIdAsync(userRole.userId);
            await _userManager.AddToRoleAsync(user, userRole.roleName);

            return Ok("Role Added");
        }



        //Read
        [HttpGet]
        [Route("GetEmployees")]
        [Authorize(Roles = "Admin,Developer,DemoAdmin,DemoDeveloper")]
        public async Task<ActionResult> GetEmployees()
        {
            return Ok(await _context.Users.ToListAsync());
        }

        [HttpGet]
        [Route("GetManageUserRolesData")]
        [Authorize(Roles = "Admin,Developer,DemoAdmin,DemoDeveloper")]
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
                            name = e.Name,
                        };




            return Ok(model);
        }


        [HttpGet]
        [Route("GetUser")]
        [Authorize(Roles = "Admin,Developer,DemoAdmin,DemoDeveloper")]
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
        [HttpPut]
        [Route("ForgotPassword")]
        public async Task<ActionResult> ForgotPassword(ForgotPasswordDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null)
            {
                return BadRequest("Invalid Request");
            }

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var param = new Dictionary<string, string?>
            {
                { "token", token },
                { "email", dto.Email}
            };

            var callback = QueryHelpers.AddQueryString(dto.ClientUrl, param);

            EmailDto email = new EmailDto();
            email.To = dto.Email;
            email.Subject = "Reset Password";
            email.Body = callback;
            _emailService.SendEmail(email);
            return Ok();
        }


        //Delete

    }


    

}
