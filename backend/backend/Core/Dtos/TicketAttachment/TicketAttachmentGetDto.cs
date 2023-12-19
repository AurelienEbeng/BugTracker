namespace backend.Core.Dtos.TicketAttachment
{
    public class TicketAttachmentGetDto
    {
        public int Id { get; set; }
        public string Notes { get; set; }
        public DateTime DateUploaded { get; set; }
        public string fileUrl { get; set; }

      
        public int TicketId { get; set; }
        public string TicketTitle { get; set; }

        public int UploaderId { get; set; }
        public string UploaderName { get; set; }
    }
}
