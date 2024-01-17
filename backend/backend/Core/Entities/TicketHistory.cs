namespace backend.Core.Entities
{
    public class TicketHistory
    {
        public int Id { get; set; }
     
        public string OldValue { get; set; }
        public string NewValue { get; set; }
        public DateTime DateModified { get; set; }
        public string Property { get; set; }

        //Relations
        public int TicketId { get; set; }
        public Ticket Ticket { get; set; }

        public int EmployeeId { get; set; }
        public EmployeePerso Employee { get; set; }






    }
}
