﻿using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.ProjectMember;
using backend.Core.Entities;
using backend.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin,Developer,DemoAdmin,DemoDeveloper")]
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
        [Route("AssignEmployeesToProject/{userId}")]
        public async Task<IActionResult> AssignEmployeesToProject([FromBody] ProjectMemberCreateDto dto, string userId)
        {
            var project = _context.Projects.Where(p => p.Id == dto.ProjectId).First();

            bool isAdmin = CheckUsers.CheckAdmin(_context,userId);
            
            if (project.ManagerId == userId || isAdmin == true)
            {
                
                var newProjectMember = new ProjectMember() { MemberId = dto.MemberId, ProjectId = dto.ProjectId };
                var notification = new Notification();
                notification.AddedToProject(project.Name, dto.MemberId);


                await _context.ProjectMembers.AddAsync(newProjectMember);
                await _context.Notifications.AddAsync(notification);
                await _context.SaveChangesAsync();
                return Ok("Project Member added successfully");
            }

            return Ok("You are not an admin or a project manager");

            

        }


        //Read
        [HttpGet]
        [Route("GetAll")]
        public async Task<ActionResult<IEnumerable<ProjectMemberGetDto>>> GetAllProjectMembers()
        {
            var projectMembers = await _context.ProjectMembers.ToListAsync();
            var convertedProjectMembers = _mapper.Map<IEnumerable<ProjectMemberGetDto>>(projectMembers);
            return Ok(convertedProjectMembers);

        }

        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult> GetProjectMembers ( int projectId)
        {
            var projectMembers = from pm in _context.ProjectMembers
                                 from u in _context.Users
                                where pm.ProjectId == projectId && pm.MemberId == u.Id
                                select new
                                {
                                    projectId= pm.ProjectId,
                                    memberId= pm.MemberId,
                                    dateAdded= pm.DateAdded,
                                    username= u.UserName
                                };
            return Ok(projectMembers);
        }


        [HttpGet]
        [Route("GetAssignedPersonnel")]
        public async Task<ActionResult> GetAssignedPersonnel(int projectId)
        {
            var assignedPersonnel = from u in _context.Users
                                    from r in _context.Roles
                                    from pm in _context.ProjectMembers
                                    from ur in _context.UserRoles
                                    where pm.ProjectId == projectId && pm.MemberId == u.Id
                                    && ur.RoleId == r.Id && ur.UserId == pm.MemberId
                                    select new
                                    {
                                        userId = u.Id,
                                        username = u.Name,
                                        email = u.Email,
                                        rolename = r.Name
                                    };

            return Ok(assignedPersonnel);
        }


        [HttpGet]
        [Route("GetUnassignedPersonnel")]
        public async Task<ActionResult> GetUnassignedPersonnel(int projectId)
        {
            var members = _context.ProjectMembers.Where(p => p.ProjectId == projectId).ToList();

            var allUsers = _context.Users.ToList();


            allUsers.RemoveAll(u => members.Any(m => m.MemberId == u.Id));

            var unassignedDevelopers = new List<UnassignedDeveloperDto>();

            foreach (var u in allUsers)
            {
                unassignedDevelopers.Add(new UnassignedDeveloperDto { Id = u.Id, Name = u.Name, Email = u.Email });
            }

            return Ok(unassignedDevelopers);
        }
        //Update

        //Delete
        [HttpDelete]
        [Route("Delete")]
        public async Task<IActionResult> Delete(string userId, int projectId, string memberId)
        {
            var project = _context.Projects.Where(p => p.Id == projectId).First();

            bool isAdmin = CheckUsers.CheckAdmin(_context, userId);

            if (project.ManagerId == userId || isAdmin == true)
            {
                
                await _context.ProjectMembers.Where(p => p.ProjectId == projectId && p.MemberId == memberId).ExecuteDeleteAsync();
                var notification = new Notification();
                notification.RemovedFromProject(project.Name, memberId);
                await _context.Notifications.AddAsync(notification);
                await _context.SaveChangesAsync();
                return Ok("Deleted");
            }
            
            return Ok("You are not an admin or a project manager");

            

        }


    }
}
