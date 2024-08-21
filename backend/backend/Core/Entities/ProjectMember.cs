namespace backend.Core.Entities
{
    public class ProjectMember
    {
        public int ProjectId { get; set; }
        public Project Project { get; set; }


        public string MemberId { get; set; }
        public User Member { get; set; }

        public DateTime DateAdded { get; set; } = DateTime.UtcNow;

    }
}
