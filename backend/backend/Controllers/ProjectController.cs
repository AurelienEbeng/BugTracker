using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.Employee;
using backend.Core.Dtos.Project;
using backend.Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class ProjectController : ControllerBase
    {
        private ApplicationDBContext _context { get; }
        private IMapper _mapper { get; set; }

        public ProjectController(ApplicationDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        //CRUD

        //Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateProject([FromBody] ProjectCreateDto dto)
        {
            var newProject = _mapper.Map<Project>(dto);
            await _context.Projects.AddAsync(newProject);
            await _context.SaveChangesAsync();
            return Ok("Project Created successfully");
        }

        //Read
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<ProjectGetDto>>> GetProjects()
        {
            var projects = await _context.Projects.Include(project => project.Manager).ToListAsync();
            var convertedProjects = _mapper.Map<IEnumerable<ProjectGetDto>>(projects);
            return Ok(convertedProjects);
        }


        //Update
        //Delete
    }
}
