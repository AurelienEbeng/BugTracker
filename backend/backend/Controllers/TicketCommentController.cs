using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.TicketComment;
using backend.Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin,Developer,QualityAssurance")]
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
            var newTicketComment = _mapper.Map<TicketComment>(dto);
            newTicketComment.DateCreated = DateTime.Now;
            await _context.TicketComments.AddAsync(newTicketComment);
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
