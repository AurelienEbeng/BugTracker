using backend.Core.Context;
using backend.Core.Dtos.Project;
using backend.Core.Entities;
using Humanizer;
using Microsoft.EntityFrameworkCore;

namespace backend.Core.Services
{
    public class CheckUsers
    {

        public static bool CheckAdmin(ApplicationDBContext _context, string userId)
        {
            var admins = from r in _context.Roles
                         from ur in _context.UserRoles
                         where r.NormalizedName == "ADMIN" && ur.RoleId == r.Id
                         select new
                         {
                             id = ur.UserId
                         };

            
            foreach (var admin in admins)
            {
                if (admin.id == userId)
                {
                    return true;
                }
            }
            return false;
        }

        public static bool CheckProjectManager(ApplicationDBContext _context, string userId, int projectId)
        {
            var project = _context.Projects.Where(p => p.Id == projectId).First();
            if(project.ManagerId==userId)
            {
                return true;
            }
            return false;
        }

        public static bool CheckProjectMember(ApplicationDBContext _context, int ticketId, string userId)
        {
            var ticket = _context.Tickets.Where(t => t.Id == ticketId).FirstOrDefault();

            var projectMember = _context.ProjectMembers.Where(pm => pm.ProjectId == ticket.ProjectId && pm.MemberId == userId).FirstOrDefault();
            if (projectMember == null)
            {
                return false;
            }
            return true;
        }

    }
}
