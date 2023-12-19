using backend.Core.Entities;

namespace backend.Core.Dtos.Project
{
    public class ProjectCreateDto
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Description { get; set; }
        public DateTime DateCreated { get; set; }= DateTime.Now;


        public int ManagerId { get; set; }

        
    }
}
