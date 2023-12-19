namespace backend.Core.Dtos.Employee
{
    public class EmployeeGetDto
    {
        public int Id { get; set; }
        public string Name { get; set; }


        public string Email { get; set; }
        public DateTime DateJoined { get; set; } = DateTime.Now;


        public int RoleId { get; set; }
        public string RoleName { get; set; } 
    }
}
