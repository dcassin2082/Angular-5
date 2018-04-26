using System.Net.Mail;

namespace WebApi.Services
{
    public interface IEmailService
    {
        void SendEmail(MailMessage message, string emailAddress, SmtpClient client);
        MailMessage GenerateMailMessage(string from, string to, string subject, string body);
        SmtpClient GenerateSmtpClient();
        void GenerateEmailHistoryEntry(MailMessage message, string emailAddress, SmtpClient client, int emailTypeId);
        string GeneratePasswordResetBody(string callbackUrl);
        string GenerateEmailConfirmationBody(string body, string callbackUrl);
        string GenerateTemporaryPassword();
    }
}