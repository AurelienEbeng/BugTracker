namespace backend.Core.Dtos.TicketHistory
{
    public class TicketHistoryGetDto
    {
        public int Id { get; set; }

        public string OldValue { get; set; }
        public string NewValue { get; set; }
        public DateTime DateModified { get; set; }
        public string Property { get; set; }

        
        public int TicketId { get; set; }
        public string TicketTitle { get; set; }

        public string EmployeeId { get; set; }
        public string EmployeeName { get; set; }
    }
}
