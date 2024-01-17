using backend.Core.Entities;

namespace backend.Core.Dtos.Role
{
    public class RoleGetDto
    {
        public int Id { get; set; }
        public string Name { get; set; }

        //Relations
        //public ICollection<Employee> EmployeesPerso { get; set; }
    }
}
