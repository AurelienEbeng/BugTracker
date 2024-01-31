namespace backend.Core.Dtos.Notification
{
    public class NotificationsEmployeesCreateDto
    {
        public int NotificationId { get; set; }
        public string ToEmployeeId { get; set; }
        public bool IsRead { get; set; } = false;
    }
}
