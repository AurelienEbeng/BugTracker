namespace backend.Core.Entities
{
    public class TicketAttachment
    {
        public int Id { get; set; }
        public string Notes { get; set; }
        public DateTime DateUploaded { get; set; }
        public string fileUrl { get; set; }

        //Relations
        public int TicketId { get; set; }
        public Ticket Ticket { get; set; }

        public string UploaderId { get; set; }
        public Employee Uploader { get; set; }



    }
}
