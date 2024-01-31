namespace backend.Core.Dtos.Notification
{
    public class NotificationCreateDto
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public DateTime DateCreated { get; set; } 
    }
}
