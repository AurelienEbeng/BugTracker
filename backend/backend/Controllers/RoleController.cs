using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.Role;
using backend.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        //ctor   creates a constructor when you press tab twice
        private ApplicationDBContext _context { get; }
        private IMapper _mapper{get; set;}

        public RoleController(ApplicationDBContext context, IMapper mapper)
        {
            _context= context;
            _mapper=mapper;
        }

        //CRUD

        //Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateRole([FromBody] RoleCreateDto dto)
        {
            RolePerso newRole = _mapper.Map<RolePerso>(dto); //maps to Role entity and the source is dto
            await _context.RolesPerso.AddAsync(newRole);
            await _context.SaveChangesAsync();
            return Ok("Role Created Successfully");
        }
        //Read
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult <IEnumerable<RoleGetDto>>> GetRoles()
        {
            var roles = await _context.RolesPerso.ToListAsync();
            var convertedRoles = _mapper.Map<IEnumerable<RoleGetDto>>(roles);
            return Ok(convertedRoles);
        }

        
        //Update
        //Delete
    }
}
