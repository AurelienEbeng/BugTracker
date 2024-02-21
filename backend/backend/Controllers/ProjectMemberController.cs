using AutoMapper;
using backend.Core.Context;
using backend.Core.DataTransfer;
using backend.Core.Dtos.ProjectMember;
using backend.Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Roles = "Admin")]
    public class ProjectMemberController : ControllerBase
    {
        public ApplicationDBContext _context { get; }
        private IMapper _mapper { get; set; }

        public ProjectMemberController(ApplicationDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        //CRUD

        //Create
        [HttpPost]
        [Route("AssignEmployeesToProject")]
        public async Task<IActionResult> AssignEmployeesToProject([FromBody] ProjectMemberCreateDto dto)
        {
            var project = _context.Projects.Where(p => p.Id == dto.ProjectsId).First();
            if(project.ManagerId == EmployeeId.Id || "bb1c27a0-38fb-4594-abcb-bd8620a03306"==EmployeeId.Id)
            {


                return Ok("Admin or project manager");
            }

            await _context.SaveChangesAsync();
            return Ok("");


            //var newProjectMember = new ProjectMember() { MembersId= dto.MembersId, ProjectsId = dto.ProjectsId} ;
            //await _context.ProjectsMembers.AddAsync(newProjectMember);
            //await _context.SaveChangesAsync();
            //return Ok("Project Member added successfully");
        }


        //Read
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<ProjectMemberGetDto>>> GetProjects()
        {
            var projectMembers = await _context.ProjectsMembers.ToListAsync();
            var convertedProjectMembers = _mapper.Map<IEnumerable<ProjectMemberGetDto>>(projectMembers);
            return Ok(convertedProjectMembers);

        }


        //Update

        //Delete

    }
}
