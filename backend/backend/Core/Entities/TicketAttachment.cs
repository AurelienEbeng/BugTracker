namespace backend.Core.Entities
{
    public class TicketAttachment
    {
        public int Id { get; set; }
        public string Notes { get; set; }
        public DateTime DateUploaded { get; set; } = DateTime.UtcNow;
        public string fileUrl { get; set; }

        //Relations
        public int TicketId { get; set; }
        public Ticket Ticket { get; set; }

        public string UploaderId { get; set; }
        public User Uploader { get; set; }



    }
}
