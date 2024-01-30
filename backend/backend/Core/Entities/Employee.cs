using Microsoft.AspNetCore.Identity;

namespace backend.Core.Entities
{
    public class Employee : IdentityUser
    {
        public string Name { get; set; }
        public DateTime DateJoined { get; set; } = DateTime.Now;

        //Relationships
        public ICollection<TicketComment> TicketComments { get; set; }
        public ICollection<Project> Projects { get; set; }
        public ICollection<Project> ManagedProjects { get; set; }
        public ICollection<TicketHistory> TicketHistories { get; set; }
        public ICollection<TicketAttachment> TicketAttachments { get; set; }
        public ICollection<NotificationsEmployees> NotificationsEmployees { get; set; }
    }
}
