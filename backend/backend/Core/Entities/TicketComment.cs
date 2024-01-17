namespace backend.Core.Entities
{
    public class TicketComment
    {
        public int Id { get; set; }
        
        public string Message { get; set; }
        public DateTime DateCreated {  get; set; }
        
        //Relations
        public int TicketId { get; set; }
        public Ticket Ticket { get; set; }

        public int CommenterId { get; set; }
        public EmployeePerso Commenter{ get; set; }


    }
}
