using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.Notification;
using backend.Core.Dtos.Ticket;
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

        ////CRUD
        ////Create
        //[HttpPost]
        //[Route("Create")]
        //public async Task<IActionResult> CreateNotification([FromBody] NotificationCreateDto dto)
        //{
        //    var newNotification = _mapper.Map<Notification>(dto);
        //    await _context.Notification.AddAsync(newNotification);
        //    await _context.SaveChangesAsync();

        //    var notification = _context.Notification.Where(
        //        notification => notification.Message == newNotification.Message &&
        //        notification.DateCreated == newNotification.DateCreated).FirstOrDefault();

        //    var projectMembers = _context.ProjectsMembers.Where(
        //        projectMember => projectMember.ProjectsId == 1); //All notifications will only concern members of project 1

        //    foreach(var projectMember in projectMembers)
        //    {
        //        var newNotificationEmployee = new NotificationsEmployees();
        //        newNotificationEmployee.NotificationId = notification.Id;
        //        newNotificationEmployee.ToEmployeeId = projectMember.MembersId;
        //        await _context.NotificationsEmployees.AddAsync(newNotificationEmployee);


        //    }

        //    await _context.SaveChangesAsync();
        //    return Ok("Success");
        //}






        //CRUD
        //Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateNotificationAndAddToAllMembersOfOneProject(string message)
        {
            var newNotification = new Notification();
            newNotification.Message = message;

            await _context.Notification.AddAsync(newNotification);
            await _context.SaveChangesAsync();

            var notification = _context.Notification.Where(
                notification => notification.Message == newNotification.Message &&
                notification.DateCreated == newNotification.DateCreated).FirstOrDefault();

            var projectMembers = _context.ProjectsMembers.Where(
                projectMember => projectMember.ProjectsId == 1); //All notifications will only concern members of project 1

            foreach (var projectMember in projectMembers)
            {
                var newNotificationEmployee = new NotificationsEmployees();
                newNotificationEmployee.NotificationId = notification.Id;
                newNotificationEmployee.ToEmployeeId = projectMember.MembersId;
                await _context.NotificationsEmployees.AddAsync(newNotificationEmployee);


            }

            await _context.SaveChangesAsync();
            return Ok("Success");
        }














        //Read
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<NotificationGetDto>>> GetNotifications()
        {
            var notificationEmployees = await _context.NotificationsEmployees
                .Include(notification => notification.ToEmployee )
                .Include(notification => notification.Notification).ToListAsync();
            var convertedNotificationEmployees = _mapper.Map<IEnumerable<NotificationGetDto>>(notificationEmployees);
            return Ok(convertedNotificationEmployees);
        }


    }
}
