namespace backend.Core.Entities
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Description { get; set; }
        public DateTime DateCreated { get; set; }

        //Relations
        public int ManagerId { get; set; }
        public EmployeePerso Manager { get; set; }

        public ICollection<Ticket> Tickets { get; set; }
        public ICollection<EmployeePerso> Members { get; set; }
    }
}
