using backend.Core.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class RoleController : ControllerBase
    {
        private ApplicationDBContext _context { get; }
        private readonly RoleManager<IdentityRole> _roleManager;
        public RoleController(ApplicationDBContext context, RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            _roleManager = roleManager;
        }


        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateRole(string name)
        {
            var roleExist = await _roleManager.RoleExistsAsync(name);
            if (roleExist) { return Ok("Role exist"); }
            IdentityRole role = new IdentityRole { Name = name };
            var result = await _roleManager.CreateAsync(role);
            if (result.Succeeded)
            {
                return Ok("Success");
            }
            return Ok("Unsuccess");
        }


        [HttpGet]
        [Route("Get")]
        public async Task<IdentityRole> GetRole(string name)
        {
            return await _roleManager.FindByNameAsync(name);
        }

        [HttpGet]
        [Route("GetRoles")]
        public async Task<ActionResult> GetRoles()
        {
            return Ok(await _roleManager.Roles.ToListAsync());
        }

    }
}