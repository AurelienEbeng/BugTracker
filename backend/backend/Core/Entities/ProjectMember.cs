namespace backend.Core.Entities
{
    public class ProjectMember
    {
        public int ProjectsId { get; set; }
        public Project Project { get; set; }


        public string MembersId { get; set; }
        public Employee Employee { get; set; }

        public DateTime DateAdded { get; set; }

    }
}
