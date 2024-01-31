namespace backend.Core.Entities
{
    public class ProjectsMembers
    {
        public int ProjectID { get; set; }
        public Project Project { get; set; }


        public string EmployeeId { get; set; }
        public Employee Employee { get; set; }

        public DateTime DateAdded { get; set; }

    }
}
