namespace backend.Core.Dtos.TicketComment
{
    public class TicketCommentGetDto
    {
        public int Id { get; set; }

        public string Message { get; set; }
        public DateTime DateCreated { get; set; }

        
        public int TicketId { get; set; }
        public string TicketTitle { get; set; }

        public int CommenterId { get; set; }
        public string CommenterName { get; set; }
    }
}
