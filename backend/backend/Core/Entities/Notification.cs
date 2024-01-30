namespace backend.Core.Entities
{
    public class Notification
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public DateTime DateCreated { get; set; }
        //public bool IsRead { get; set; } = false;

        /*
         One notification can be directed to many employees
        One employee can have multiple notification
        Employees read notification at different times
         */
        public ICollection<NotificationsEmployees> NotificationsEmployees { get; set; }
    }
}
