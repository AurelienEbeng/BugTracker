using backend.Core.Dtos.Email;

namespace backend.Core.Services.EmailService
{
    public interface IEmailService
    {
        void SendEmail(EmailDto request);
    }
}
