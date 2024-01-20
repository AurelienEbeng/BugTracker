using AutoMapper;
using Microsoft.AspNetCore.Identity;

namespace backend.AutoMapperConfig
{
    public class AutoMapperConfigProfile:Profile
    {
        public AutoMapperConfigProfile() {
            //Role
            //CreateMap<RoleCreateDto, IdentityRole>();
            //CreateMap<IdentityRole, RoleGetDto>();
        }
    }
}
