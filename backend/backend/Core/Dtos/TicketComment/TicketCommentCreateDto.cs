namespace backend.Core.Dtos.TicketComment
{
    public class TicketCommentCreateDto
    {
        public int Id { get; set; }

        public string Message { get; set; }
        public DateTime DateCreated { get; set; }


        public int TicketId { get; set; }

        public string CommenterId { get; set; }
    }
}
