using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.Notification;
using backend.Core.Dtos.TicketComment;
using backend.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        public ApplicationDBContext _context { get; }
        private IMapper _mapper { get; set; }

        public NotificationController (ApplicationDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        //CRUD
        //Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateNotification([FromBody] NotificationCreateDto dto)
        {
            var newNotification = _mapper.Map<Notification>(dto);
            await _context.Notification.AddAsync(newNotification);
            await _context.SaveChangesAsync();
            var notification = _context.Notification.Where(
                notification => notification.Message == newNotification.Message &&
                notification.DateCreated == newNotification.DateCreated).FirstOrDefault();

            
            return Ok(notification.Id);
        }


        
    }
}
