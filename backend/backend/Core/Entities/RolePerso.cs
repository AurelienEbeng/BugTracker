namespace backend.Core.Entities
{
    public class RolePerso
    {
        public int Id { get; set; }
        public string Name { get; set; }

        //Relations
        public ICollection<EmployeePerso> Employees { get; set; }
    }
}
