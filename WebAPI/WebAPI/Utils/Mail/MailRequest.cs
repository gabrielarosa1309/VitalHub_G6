namespace WebAPI.Utils.Mail
{
    public class MailRequest
    {
        //Destinatário do email
        public string? ToEmail { get; set; }

        //Assunto do email
        public string? Subject { get; set; }

        //Corpo do email
        public string? Body { get; set; }
    }
}
