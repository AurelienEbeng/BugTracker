using Microsoft.AspNetCore.Identity;

namespace backend.Core.Entities
{
    public class Role : IdentityRole
    {
        public ICollection<UserRole> UserRoles { get; set; }
    }
}
