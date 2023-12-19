namespace backend.Core.Entities
{
    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        

        public string Email {  get; set; }
        public DateTime DateJoined { get; set; } = DateTime.Now;

        //Relations
        public int RoleId { get; set; }
        public Role Role { get; set; }

        
        public ICollection<TicketComment> TicketComments { get; set; }

        public ICollection<TicketHistory> TicketHistories { get; set; }

        public ICollection<Project> Projects { get; set; }

        public ICollection<Project> ManageProjects { get; set; }

        public ICollection<TicketAttachment> TicketAttachments { get; set; }







    }
}
