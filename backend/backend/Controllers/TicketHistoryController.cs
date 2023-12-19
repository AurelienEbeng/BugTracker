using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.Project;
using backend.Core.Dtos.TicketComment;
using backend.Core.Dtos.TicketHistory;
using backend.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketHistoryController : ControllerBase
    {
        private ApplicationDBContext _context { get; }
        private IMapper _mapper { get; set; }

        public TicketHistoryController(ApplicationDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        //CRUD

        //Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateTicketHistory([FromBody] TicketHistoryCreateDto dto)
        {
            var newTicketHistory = _mapper.Map<TicketHistory>(dto);
            await _context.TicketHistories.AddAsync(newTicketHistory);
            await _context.SaveChangesAsync();
            return Ok("Ticket History Created successfully");
        }

        //Read
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<TicketHistoryGetDto>>> GetTicketComments()
        {
            var ticketHistory = await _context.TicketHistories.Include(ticketHistory => ticketHistory.Ticket)
                                                               .Include(ticketHistory => ticketHistory.Employee).ToListAsync();
            var convertedTicketHistory = _mapper.Map<IEnumerable<TicketHistoryGetDto>>(ticketHistory);
            return Ok(convertedTicketHistory);
        }


        //Update
        //Delete
    }
}
