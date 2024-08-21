using backend.Core.DataTransfer;

namespace backend.Core.Entities
{
    public class TicketComment
    {
        public int Id { get; set; }
        
        public string Message { get; set; }
        public DateTime DateCreated {  get; set; } = DateTime.UtcNow;
        
        //Relations
        public int TicketId { get; set; }
        public Ticket Ticket { get; set; }

        public string CommenterId { get; set; } = EmployeeId.Id;
        public User Commenter{ get; set; }


    }
}
