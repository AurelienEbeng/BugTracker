using AutoMapper;
using backend.Core.Context;
using backend.Core.DataTransfer;
using backend.Core.Dtos.ProjectMember;
using backend.Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net.Sockets;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin,Developer")]
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
            var project = _context.Projects.Where(p => p.Id == dto.ProjectId).First();
            if(project.ManagerId == EmployeeId.Id || "bb1c27a0-38fb-4594-abcb-bd8620a03306"==EmployeeId.Id)
            {
                //Only the admin or the project manager can add an employee to a project
                var newProjectMember = new ProjectMember() { MemberId = dto.MemberId, ProjectId = dto.ProjectId };

                

                await _context.ProjectMembers.AddAsync(newProjectMember);
                await _context.SaveChangesAsync();
                return Ok("Project Member added successfully");
            }

            return Ok("You are not an admin or a project manager");


            
        }


        //Read
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<ProjectMemberGetDto>>> GetProjects()
        {
            var projectMembers = await _context.ProjectMembers.ToListAsync();
            var convertedProjectMembers = _mapper.Map<IEnumerable<ProjectMemberGetDto>>(projectMembers);
            return Ok(convertedProjectMembers);

        }


        //Update

        //Delete
        [HttpDelete]
        [Route("Delete")]
        public async Task<IActionResult> Delete(int projectId, string employeeId)
        {

            await _context.ProjectMembers.Where(p => p.ProjectId== projectId && p.MemberId == employeeId).ExecuteDeleteAsync();
            return Ok("Deleted");

        }


    }
}
