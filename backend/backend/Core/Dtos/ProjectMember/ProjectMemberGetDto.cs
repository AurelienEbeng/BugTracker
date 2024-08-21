namespace backend.Core.Dtos.ProjectMember
{
    public class ProjectMemberGetDto
    {
        public int ProjectId { get; set; }
        public string MemberId { get; set; }
        public DateTime DateAdded { get; set; }
    }
}
