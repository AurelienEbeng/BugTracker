using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.Employee;
using backend.Core.Dtos.Ticket;
using backend.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private ApplicationDBContext _context { get; }
        private IMapper _mapper { get; set; }

        public TicketController(ApplicationDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        //CRUD

        //Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateTicket([FromBody] TicketCreateDto dto)
        {
            var newTicket = _mapper.Map<Ticket>(dto);
            await _context.Tickets.AddAsync(newTicket);
            await _context.SaveChangesAsync();
            return Ok("Ticket Created successfully");
        }

        //Read
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<TicketGetDto>>> GetTickets()
        {
            var tickets = await _context.Tickets.Include(ticket => ticket.Project).ToListAsync();
            var convertedTickets = _mapper.Map<IEnumerable<TicketGetDto>>(tickets);
            return Ok(convertedTickets);
        }


        //Update
        //Delete
    }
}
