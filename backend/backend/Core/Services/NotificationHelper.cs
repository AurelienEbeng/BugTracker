using backend.Core.Context;
using backend.Core.Entities;

namespace backend.Core.Services
{
    public class NotificationHelper
    {
        private ApplicationDBContext _context { get; }

        public NotificationHelper(ApplicationDBContext context)
        {
            _context = context;
        }

        public async void CommentAddedNotificationForProjectMembers(int ticketId) {
            var ticket = _context.Tickets.Where(t => t.Id == ticketId).FirstOrDefault();

            var members = from pm in _context.ProjectMembers
                          where pm.ProjectId == ticket.ProjectId
                          select new
                          {
                              id = pm.MemberId
                          };

            foreach(var member in members)
            {
                var notification = new Notification();
                notification.Message = "A comment has been added to ticket" + ticket.Title;
                notification.ReceiverId = member.id;
                await _context.Notifications.AddAsync(notification);
            }

        }
    }
}
