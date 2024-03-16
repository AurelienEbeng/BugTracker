using backend.Core.Entities;

namespace backend.Core.Services
{
    public interface IAuthService
    {
        string GenerateTokenString(Login user);
    }
}