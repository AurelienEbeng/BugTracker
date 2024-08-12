using Microsoft.AspNetCore.Identity;

namespace backend.Core.Entities
{
    public class UserRole : IdentityUserRole<string>
    {
        public Employee Employee { get; set; }
        public Role Role { get; set; }
    }
}
