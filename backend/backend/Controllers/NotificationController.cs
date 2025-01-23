using backend.Core.Context;
using backend.Core.Dtos.Notification;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin,Developer,DemoAdmin,DemoDeveloper")]
    public class NotificationController : ControllerBase
    {
        private ApplicationDBContext _context { get; }

        public NotificationController(ApplicationDBContext context)
        {
            _context = context;
        }

        // Read
        [HttpGet]
        [Route("GetMyNotifications/{userId}")]
        public async Task<ActionResult> GetMyNotfications(string userId)
        {
            var notifications = from n in _context.Notifications
                                where n.ReceiverId == userId && n.IsRead == false
                                select new
                                {
                                    id = n.Id,
                                    receiverId = n.ReceiverId,
                                    isRead = n.IsRead,
                                    message = n.Message
                                };
            return Ok(notifications);
        }

        // Update
        [HttpPut]
        [Route("MarkAsRead")]
        public async Task<ActionResult> MarkAsRead(NotificationDto[] notifications)
        {
            foreach(var item in notifications)
            {
                var notification = _context.Notifications.Where(n => n.Id == item.Id).FirstOrDefault();
                notification.IsRead = true;
            }

            await _context.SaveChangesAsync();
            
            return Ok("Notifications updated");
        }
    }
}
