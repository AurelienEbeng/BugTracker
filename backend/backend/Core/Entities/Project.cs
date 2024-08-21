namespace backend.Core.Entities
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Description { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;

        //Relations
        public string ManagerId { get; set; }
        public User Manager { get; set; }

        public ICollection<Ticket> Tickets { get; set; }
        public ICollection<User> Members { get; set; }
    }
}
