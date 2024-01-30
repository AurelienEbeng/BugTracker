namespace backend.Core.Entities
{
    public class NotificationsEmployees
    {
        
        public int NotificationId { get; set; }
        public Notification Notification { get; set; }

        
        public string ToEmployeeId { get; set; }
        public Employee ToEmployee { get; set; }

        public bool IsRead { get; set; }=false;
    }
}
