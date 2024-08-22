using backend.Core.Entities;
using backend.Core.Enums;

namespace backend.Core.Dtos.Ticket
{
    public class TicketCreateDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DateCreated { get; set; }
        public TicketStatus Status { get; set; }
        public string Type { get; set; }
        public TicketPriority Priority { get; set; }


        public int ProjectId { get; set; }
        public string CreatorId { get; set; }
        public string AssignedDeveloperId { get; set; }
    }
}
