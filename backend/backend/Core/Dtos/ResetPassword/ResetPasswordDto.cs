namespace backend.Core.Dtos.ResetPassword
{
    public class ResetPasswordDto
    {
        public string Password { get; set; }
        public string ConfirmPassword {  get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
    }
}
