namespace backend.Core.Entities
{
    public class Notification
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.Now;
        public bool IsRead { get; set; } = false;
        public string ReceiverId { get; set; }
        public User Receiver { get; set; }

    }
}
