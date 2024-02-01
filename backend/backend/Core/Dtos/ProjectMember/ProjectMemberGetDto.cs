namespace backend.Core.Dtos.ProjectMember
{
    public class ProjectMemberGetDto
    {
        public int ProjectsId { get; set; }
        public string MembersId { get; set; }
        public DateTime DateAdded { get; set; }
    }
}
