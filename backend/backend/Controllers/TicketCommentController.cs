using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.Project;
using backend.Core.Dtos.TicketComment;
using backend.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
        public async Task<ActionResult<IEnumerable<TicketCommentGetDto>>> GetTicketComment(int ticketId)
        {
            var ticketComment = await _context.TicketComments
                                              .Include(ticketComment => ticketComment.Ticket)
                                              .Where(ticketComment=> ticketComment.TicketId==ticketId)
                                              .ToListAsync();
            var convertedTicketComment = _mapper.Map<IEnumerable<TicketCommentGetDto>>(ticketComment);
            return Ok(convertedTicketComment);
        }


        //Update
        //Delete
    }
}
