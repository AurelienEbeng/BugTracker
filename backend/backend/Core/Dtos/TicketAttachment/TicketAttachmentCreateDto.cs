namespace backend.Core.Dtos.TicketAttachment
{
    public class TicketAttachmentCreateDto
    {
        public int Id { get; set; }
        public string Notes { get; set; }
        


        public int TicketId { get; set; }

        public int UploaderId { get; set; }
    }
}
