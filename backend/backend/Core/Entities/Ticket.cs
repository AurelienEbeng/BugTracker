using backend.Core.Enums;

namespace backend.Core.Entities
{
    public class Ticket
    {
        
        public int Id { get; set; }
        public string Title {  get; set; }
        public string Description { get; set; }
        public DateTime DateCreated { get; set; }
        public TicketStatus Status { get; set; }
        public TicketType Type { get; set; }
        public TicketPriority Priority { get; set; }

        //Relations
        public ICollection<TicketComment> TicketComments { get; set; }

        public int ProjectId { get; set; }
        public Project Project { get; set; }
        public ICollection<TicketAttachment> TicketAttachments { get; set; }

        public ICollection<TicketHistory> TicketHistories { get; set; }
        public string CreatorId { get; set; }
        public User Creator { get; set; }
        public string AssignedDeveloperId { get; set; }
        public User AssignedDeveloper { get; set; }


    }
}
