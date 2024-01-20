using Microsoft.AspNetCore.Identity;

namespace backend.Models
{
    public class Employee: IdentityUser
    {
        public string Name { get; set; }
        public DateTime DateJoined { get; set; } = DateTime.Now;
    }
}
