using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.Project;
using backend.Core.Dtos.ProjectMember;
using backend.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
        [Route("Create")]
        public async Task<IActionResult> CreateProjectMember([FromBody] ProjectMemberCreateDto dto)
        {
            //var newProjectMember = _mapper.Map<ProjectsMembers>(dto);
            

            var newProjectMember = new ProjectMember() { MembersId= dto.MembersId, ProjectsId = dto.ProjectsId} ;
            //newProjectMember.ProjectID = dto.ProjectsId;
            //newProjectMember.MembersId = dto.MembersId;
            await _context.ProjectsMembers.AddAsync(newProjectMember);
            await _context.SaveChangesAsync();
            return Ok("Project Member added successfully");
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
    }
}
