using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.TicketComment;
using backend.Core.Entities;
using backend.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol;


namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin,Developer,DemoAdmin,DemoDeveloper")]
    public class TicketCommentController : ControllerBase
    {
        private ApplicationDBContext _context { get; }
        private IMapper _mapper { get; set; }

        public TicketCommentController(ApplicationDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        //CRUD

        //Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateTicketComment([FromBody] TicketCommentCreateDto dto)
        {
            bool isProjectMember = CheckUsers.CheckProjectMember(_context, dto.TicketId, dto.CommenterId);
            bool isAdmin = CheckUsers.CheckAdmin(_context, dto.CommenterId);
            if(isProjectMember == false && isAdmin == false)
            {
                return Ok("You're not a member of the project");
            }
            
            var newTicketComment = _mapper.Map<TicketComment>(dto);
            newTicketComment.DateCreated = DateTime.Now;
            await _context.TicketComments.AddAsync(newTicketComment);
            var notificationHelper = new NotificationHelper(_context);
            notificationHelper.CommentAddedNotificationForProjectMembers(dto.TicketId);
            await _context.SaveChangesAsync();

            


            return Ok("Ticket Comment Created successfully");
        }

        //Read
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<TicketCommentGetDto>>> GetTicketComments()
        {
            var ticketComments = await _context.TicketComments.Include(ticketComment => ticketComment.Ticket).ToListAsync();
            var convertedTicketComments = _mapper.Map<IEnumerable<TicketCommentGetDto>>(ticketComments);
            return Ok(convertedTicketComments);
        }

        //Read by ticketId
        [HttpGet]
        [Route("Get/{ticketId}")]
        public async Task<ActionResult> GetTicketComment(int ticketId)
        {
            var ticketComment = from c in _context.TicketComments
                                from u in _context.Users
                                where c.TicketId == ticketId && u.Id == c.CommenterId
                                select new {
                                    ticketId = c.TicketId,
                                    id = c.Id,
                                    message = c.Message,
                                    commenterId = c.CommenterId,
                                    commenterName = u.Name,
                                    dateCreated = c.DateCreated,
                                };
            return Ok(ticketComment.ToList());
        }


        //Update

        //Delete
        [HttpDelete]
        [Route("Delete/{commentId}")]
        public async Task<IActionResult> DeleteComment(int commentId)
        {
            
            await _context.TicketComments.Where(c => c.Id == commentId).ExecuteDeleteAsync();
            return Ok("Deleted");
            
        }

    }
}
