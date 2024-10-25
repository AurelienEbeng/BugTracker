using backend.Core.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin,Developer,QualityAssurance")]
    public class NotificationController : ControllerBase
    {
        private ApplicationDBContext _context { get; }

        public NotificationController(ApplicationDBContext context)
        {
            _context = context;
        }

        // Read
        [HttpGet]
        [Route("GetMyNotifications")]
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
    }
}
