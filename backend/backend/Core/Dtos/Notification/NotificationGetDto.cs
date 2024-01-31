using backend.Core.Entities;

namespace backend.Core.Dtos.Notification
{
    public class NotificationGetDto
    {
        public int NotificationId { get; set; }
        public string ToEmployeeId { get; set; }
        public string Message { get; set; }
        public DateTime DateCreated { get; set; }
        public string EmployeeName {  get; set; }   
        public bool IsRead { get; set; } = false;
    }
}
