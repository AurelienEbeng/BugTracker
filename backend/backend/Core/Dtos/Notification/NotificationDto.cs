namespace backend.Core.Dtos.Notification
{
    public class NotificationDto
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public bool IsRead { get; set; } = false;
        public string ReceiverId { get; set; }
    }
}
