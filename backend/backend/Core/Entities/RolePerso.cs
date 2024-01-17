namespace backend.Core.Entities
{
    public class RolePerso
    {
        public int Id { get; set; }
        public string Name { get; set; }

        //Relations
        public ICollection<Employee> Employees { get; set; }
    }
}
