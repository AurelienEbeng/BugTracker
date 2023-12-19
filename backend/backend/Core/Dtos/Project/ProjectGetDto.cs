using backend.Core.Entities;

namespace backend.Core.Dtos.Project
{
    public class ProjectGetDto
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Description { get; set; }
        public DateTime DateCreated { get; set; }


        public int ManagerId { get; set; }
        public string ManagerName { get; set; }

    }
}
