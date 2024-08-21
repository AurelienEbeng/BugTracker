using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.Project;
using backend.Core.Entities;
using Microsoft.AspNetCore.Authorization;
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
            newProject.DateCreated = DateTime.Now;
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

        [HttpGet]
        [Route("GetMyProjects")]
        public async Task<ActionResult> GetMyProjects(string userId)
        {
            var myProjects = from p in _context.Projects
                             from e in _context.Users
                             from pm in _context.ProjectMembers
                             where p.Id== pm.ProjectId && e.Id==pm.MemberId && pm.MemberId == userId
                             select new
                             {
                                 id = p.Id,
                                 name = p.Name,
                                 managerName = e.Name,
                                 description = p.Description,
                                 dateCreated = p.DateCreated,
                             };
            if (myProjects == null) { return Ok(); }
            return Ok(myProjects);
        }


        //Update
        [HttpPut]
        [Route("Update")]
        public async Task<IActionResult> UpdateProject(ProjectCreateDto updatedProject) {
            var project = _context.Projects.Where(p => p.Id == updatedProject.Id).FirstOrDefault();

            project.ManagerId = updatedProject.ManagerId;
            project.Name = updatedProject.Name;
            project.Description = updatedProject.Description;
            await _context.SaveChangesAsync();

            return Ok("Project Manager Changed successfully");
        }
        //Delete
    }
}
