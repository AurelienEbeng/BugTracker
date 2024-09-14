using AutoMapper;
using AutoMapper.Execution;
using backend.Core.Context;
using backend.Core.DataTransfer;
using backend.Core.Dtos.ProjectMember;
using backend.Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.ComponentModel;
using System.Data;
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
        [Route("AssignEmployeesToProject/{userId}")]
        public async Task<IActionResult> AssignEmployeesToProject([FromBody] ProjectMemberCreateDto dto, string userId)
        {
            var project = _context.Projects.Where(p => p.Id == dto.ProjectId).First();

            var admins = from r in _context.Roles
                         from ur in _context.UserRoles
                         where r.NormalizedName == "ADMIN"
                         select new
                         {
                             id = ur.UserId
                         };

            bool isAdmin = false;

            foreach (var admin in admins)
            {
                if (admin.id == userId)
                {
                    isAdmin = true;
                    break;
                }
            }



            if (project.ManagerId == userId || isAdmin == true)
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
            SqlConnectionStringBuilder cs = new SqlConnectionStringBuilder();
            cs.DataSource = "(local)";
            cs.InitialCatalog = "BugTracker";
            cs.UserID = "sa";
            cs.Password = "sysadm";
            cs.TrustServerCertificate = true;
            SqlConnection con = new SqlConnection();
            con.ConnectionString = cs.ConnectionString;
            con.Open();
            SqlCommand cmd = con.CreateCommand();
            cmd.CommandText = "select * from Users\r\nleft join\r\n" +
                "(select ProjectMembers.ProjectId \"ProjectId\", ProjectMembers.MemberId \"MemberId\" \r\nfrom ProjectMembers " +
                "where ProjectMembers.ProjectId="+projectId+") \r\nProjectMember on ProjectMember.MemberId=Users.Id\r\n" +
                "where ProjectMember.MemberId is null\r\n";
            List<object> unassignedDevelopers = new List<object>();
            try
            {

                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    unassignedDevelopers.Add(new { id=reader["Id"], name = reader["Name"], email = reader["Email"] });
                }
                reader.Close();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            con.Close();

            return Ok(unassignedDevelopers);
        }
        //Update

        //Delete
        [HttpDelete]
        [Route("Delete/{userId}")]
        public async Task<IActionResult> Delete(ProjectMemberCreateDto dto, string userId)
        {
            var project = _context.Projects.Where(p => p.Id == dto.ProjectId).First();

            var admins = from r in _context.Roles
                         from ur in _context.UserRoles
                         where r.NormalizedName == "ADMIN"
                         select new
                         {
                             id = ur.UserId
                         };

            bool isAdmin = false;

            foreach (var admin in admins)
            {
                if (admin.id == userId)
                {
                    isAdmin = true;
                    break;
                }
            }

            if (project.ManagerId == userId || isAdmin == true)
            {
                //Only the admin or the project manager can add an employee to a project
                await _context.ProjectMembers.Where(p => p.ProjectId == dto.ProjectId && p.MemberId == dto.MemberId).ExecuteDeleteAsync();
                return Ok("Deleted");
            }

            return Ok("You are not an admin or a project manager");

            

        }


    }
}
