using backend.Core.Enums;

namespace backend.Core.Dtos.Ticket
{
    public class TicketGetDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DateCreated { get; set; }
        public TicketStatus Status { get; set; }
        public TicketType Type { get; set; }
        public TicketPriority Priority { get; set; }


        public int ProjectId { get; set; }
        public string ProjectName { get; set; }
    }
}
