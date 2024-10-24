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

        public void AddedToProject(string projectName, string receiverId) {
            this.ReceiverId = receiverId;
            this.Message = "You've been added to project " + projectName;
        }
        
        public void RemovedFromProject(string projectName, string receiverId)
        {
            this.ReceiverId = receiverId;
            this.Message = "You've been removed from project " + projectName;
        }
    }
}
