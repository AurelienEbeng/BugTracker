using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.Employee;
using backend.Core.Dtos.Ticket;
using backend.Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
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

        //Read by project id
        [HttpGet]
        [Route("Get/project/{projectId}")]
        public async Task<ActionResult<IEnumerable<TicketGetDto>>> GetTicketsbyProjectId(int projectId)
        {
            var tickets = await _context.Tickets.Include(ticket => ticket.Project).ToListAsync();
            var filteredTickets= tickets.Where(ticket => ticket.ProjectId == projectId);
            var convertedTickets = _mapper.Map<IEnumerable<TicketGetDto>>(filteredTickets);
            return Ok(convertedTickets);
        }

        [HttpGet]
        [Route("Get/{ticketId}")]
        public async Task<ActionResult<IEnumerable<TicketGetDto>>> GetTicket(int ticketId)
        {
            var ticket = await _context.Tickets.Include(ticket => ticket.Project)
                                                .Where(ticket => ticket.Id == ticketId).ToListAsync();
            var convertedTickets = _mapper.Map<IEnumerable<TicketGetDto>>(ticket);
            return Ok(convertedTickets);
        }
        //Update
        //Delete
    }
}
