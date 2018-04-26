namespace WebApi.Models
{
    public class EmailHistory
    { 
        public int EmailHistoryID { get; set; }
        public string Sender { get; set; }
        public string Recipient { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public string Host { get; set; }
        public string CreatedUser { get; set; }
        public int EmailTypeID { get; set; }
    }
}