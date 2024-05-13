namespace WebAPI.Utils.Mail
{
    public interface IEmailService
    {
        //Método assíncrono para envio de email que recebe MailRequest
        Task SendEmailAsync(MailRequest mailRequest);
    }
}
