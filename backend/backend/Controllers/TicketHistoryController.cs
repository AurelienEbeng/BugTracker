using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.Project;
using backend.Core.Dtos.TicketComment;
using backend.Core.Dtos.TicketHistory;
using backend.Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin,Developer,DemoAdmin,DemoDeveloper")]
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
        public async Task<ActionResult<IEnumerable<TicketHistoryGetDto>>> GetTicketHistory()
        {
            var ticketHistory = await _context.TicketHistories.Include(ticketHistory => ticketHistory.Ticket)
                                                               .Include(ticketHistory => ticketHistory.Creator).ToListAsync();
            var convertedTicketHistory = _mapper.Map<IEnumerable<TicketHistoryGetDto>>(ticketHistory);
            return Ok(convertedTicketHistory);
        }

        //Read by ticketId
        [HttpGet]
        [Route("Get/{ticketId}")]
        public async Task<ActionResult<IEnumerable<TicketHistoryGetDto>>> GetTicketHistory(int ticketId)
        {
            var ticketHistory = await _context.TicketHistories.Include(ticketHistory => ticketHistory.Ticket)
                                                               .Include(ticketHistory => ticketHistory.Creator)
                                                               .Where(ticketHistory=> ticketHistory.TicketId==ticketId)
                                                               .ToListAsync();
            var convertedTicketHistory = _mapper.Map<IEnumerable<TicketHistoryGetDto>>(ticketHistory);
            return Ok(convertedTicketHistory);
        }

        //Update
        //Delete
    }
}
