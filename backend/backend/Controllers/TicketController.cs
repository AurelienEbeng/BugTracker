using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.Employee;
using backend.Core.Dtos.Ticket;
using backend.Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Core.Enums;
using Microsoft.AspNetCore.Identity;
using backend.Core.DataTransfer;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin,Developer,QualityAssurance")]
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
        [HttpPut]
        [Route("Update")]
        public async Task<IActionResult> Update(int ticketId, string property, string newValue)
        {
            var ticket = _context.Tickets.Where(ticket => ticket.Id == ticketId).First();
            property = property.ToUpper();
            newValue = newValue.ToUpper();

            if (ticket.Status.ToString() == newValue)
            {
                return Ok($"Ticket status is already {newValue}");
            }
            else if (ticket.Priority.ToString() == newValue)
            {
                return Ok($"Ticket priority is already {newValue}");
            }



            var ticketHistory = new TicketHistory();
            ticketHistory.Property = property;
            ticketHistory.NewValue= newValue;
            ticketHistory.EmployeeId = EmployeeId.Id;
            ticketHistory.TicketId = ticketId;

            

           

            if (property == "STATUS")
            {
                if (newValue == "OPEN")
                {
                    ticketHistory.OldValue = ticket.Status.ToString();
                    ticket.Status = TicketStatus.OPEN;
                    
                }
                else if(newValue=="CLOSE")
                {
                    ticketHistory.OldValue = ticket.Status.ToString();
                    ticket.Status = TicketStatus.CLOSE;
                }

               
            }
            else if (property == "PRIORITY")
            {
                if (newValue == "HIGH")
                {
                    ticketHistory.OldValue = ticket.Priority.ToString();
                    ticket.Priority = TicketPriority.HIGH;
                }
                else if (newValue == "MEDIUM")
                {
                    ticketHistory.OldValue = ticket.Priority.ToString();
                    ticket.Priority = TicketPriority.MEDIUM;
                }
                else if (newValue == "LOW")
                {
                    ticketHistory.OldValue = ticket.Priority.ToString();
                    ticket.Priority = TicketPriority.LOW;
                }
            }



            
            string notificationMessage = $"Ticket: {ticket.Title} {property} updated from {ticketHistory.OldValue} to {newValue}";
            NotificationController c = new NotificationController(_context, _mapper);
            await c.CreateNotificationAndAddToAllMembersOfOneProject(notificationMessage,ticket.ProjectId);
            
            await _context.TicketHistories.AddAsync(ticketHistory);
            _context.SaveChanges();
            
            return Ok("Ticket Updated successfully");

        }


        //Delete
    }
}
