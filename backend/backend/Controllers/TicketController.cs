using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.Ticket;
using backend.Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Core.Services;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin,Developer,DemoAdmin,DemoDeveloper")]
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
            bool isAdmin = CheckUsers.CheckAdmin(_context, dto.CreatorId);
            bool isProjectMember = CheckUsers.CheckProjectMember(_context, dto.CreatorId, dto.ProjectId);
            if(isProjectMember == false && isAdmin == false)
            {
                return Ok("You're not allowed");
            }
            dto.DateCreated = DateTime.Now;
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
        public async Task<ActionResult> GetTicket(int ticketId)
        {
            var ticket = from t in _context.Tickets
                         from p in _context.Projects
                         from a in _context.Users
                         from c in _context.Users
                         where t.Id == ticketId && p.Id == t.ProjectId && a.Id == t.AssignedDeveloperId && c.Id == t.CreatorId
                         select new
                         {
                             id = t.Id,
                             title = t.Title,
                             description = t.Description,
                             dateCreated = t.DateCreated,
                             status = t.Status,
                             type = t.Type,
                             priority = t.Priority,
                             projectId = t.ProjectId,
                             projectName = p.Name,
                             assignedDeveloperId = t.AssignedDeveloperId,
                             assignedDeveloperName = a.UserName,
                             creatorId = c.Id,
                             creatorName = c.UserName,
                         };
            return Ok(ticket.First());
        }


        [HttpGet]
        [Route("GetMyTickets")]
        public async Task<ActionResult> GetMyTickets(string userId)
        {
            var myTickets = from t in _context.Tickets
                            from p in _context.Projects
                            from a in _context.Users
                            from c in _context.Users
                            where p.Id == t.ProjectId && a.Id == t.AssignedDeveloperId && c.Id == t.CreatorId
                            && (t.AssignedDeveloperId==userId || t.CreatorId==userId)
                            select new
                            {
                                id = t.Id,
                                title = t.Title,
                                description = t.Description,
                                dateCreated = t.DateCreated,
                                status = t.Status,
                                type = t.Type,
                                priority = t.Priority,
                                projectId = t.ProjectId,
                                projectName = p.Name,
                                assignedDeveloperId = t.AssignedDeveloperId,
                                assignedDeveloperName = a.Name,
                                creatorId = c.Id,
                                creatorName = c.Name,
                            };

            return Ok(myTickets);
        }



        //Update
        [HttpPut]
        [Route("Update/{userId}")]
        public async Task<IActionResult> Update(TicketCreateDto ticket,string userId)
        {
            var oldTicket = _context.Tickets.Where(t => t.Id == ticket.Id).First();
            bool isAdmin = CheckUsers.CheckAdmin(_context, userId);
            bool isProjectManager = CheckUsers.CheckProjectManager(_context, userId, oldTicket.ProjectId);
            if(oldTicket.AssignedDeveloperId!=userId && isAdmin == false && isProjectManager == false)
            {
                return Ok("You can't modify the ticket");
            }
            var ticketHistory = new TicketHistory();
            ticketHistory.CreatorId = ticket.CreatorId;
            ticketHistory.TicketId = ticket.Id;

            if(isProjectManager==true || isAdmin == true)
            {
                if (oldTicket.AssignedDeveloperId != ticket.AssignedDeveloperId)
                {
                    var newAssignedDeveloper = from u in _context.Users where u.Id == ticket.AssignedDeveloperId select new { name = u.Name };
                    var oldAssignedDeveloper = from u in _context.Users where u.Id == oldTicket.AssignedDeveloperId select new { name = u.Name };
                    ticketHistory.OldValue = oldAssignedDeveloper.First().name;
                    ticketHistory.NewValue = newAssignedDeveloper.First().name;
                    ticketHistory.Property = "Assigned Developer";
                    await _context.TicketHistories.AddAsync(
                        new TicketHistory
                        {
                            OldValue = ticketHistory.OldValue,
                            NewValue = ticketHistory.NewValue,
                            Property = ticketHistory.Property,
                            CreatorId = ticketHistory.CreatorId,
                            TicketId = ticketHistory.TicketId
                        }
                    );

                    var notificationHelper = new NotificationHelper(_context);
                    notificationHelper.ChangeAssignedDeveloperNotification(ticket.Title, oldTicket.AssignedDeveloperId, ticket.AssignedDeveloperId);

                    oldTicket.AssignedDeveloperId = ticket.AssignedDeveloperId;
                }
            }

            if(oldTicket.Status != ticket.Status)
            {
                ticketHistory.OldValue = oldTicket.Status.ToString();
                ticketHistory.NewValue = ticket.Status.ToString();
                ticketHistory.Property = "Status";
                await _context.TicketHistories.AddAsync(
                    new TicketHistory
                    {
                        OldValue = ticketHistory.OldValue,
                        NewValue = ticketHistory.NewValue,
                        Property = ticketHistory.Property,
                        CreatorId = ticketHistory.CreatorId,
                        TicketId = ticketHistory.TicketId
                    }
                );
                oldTicket.Status = ticket.Status;
            }

            if(oldTicket.Type != ticket.Type)
            {
                ticketHistory.OldValue = oldTicket.Type.ToString();
                ticketHistory.NewValue = ticket.Type.ToString();
                ticketHistory.Property = "Type";
                await _context.TicketHistories.AddAsync(
                    new TicketHistory
                    {
                        OldValue = ticketHistory.OldValue,
                        NewValue = ticketHistory.NewValue,
                        Property = ticketHistory.Property,
                        CreatorId = ticketHistory.CreatorId,
                        TicketId = ticketHistory.TicketId
                    }
                );
                oldTicket.Type = ticket.Type;
            }

            if(oldTicket.Description != ticket.Description)
            {
                ticketHistory.OldValue = oldTicket.Description;
                ticketHistory.NewValue = ticket.Description;
                ticketHistory.Property = "Description";
                await _context.TicketHistories.AddAsync(
                    new TicketHistory
                    {
                        OldValue = ticketHistory.OldValue,
                        NewValue = ticketHistory.NewValue,
                        Property = ticketHistory.Property,
                        CreatorId = ticketHistory.CreatorId,
                        TicketId = ticketHistory.TicketId
                    }
                );
                oldTicket.Description = ticket.Description;
            }
            
            if(oldTicket.Priority != ticket.Priority)
            {
                ticketHistory.OldValue = oldTicket.Priority.ToString();
                ticketHistory.NewValue = ticket.Priority.ToString();
                ticketHistory.Property = "Priority";
                await _context.TicketHistories.AddAsync(
                    new TicketHistory {
                        OldValue= ticketHistory.OldValue,
                        NewValue=ticketHistory.NewValue,
                        Property=ticketHistory.Property,
                        CreatorId=ticketHistory.CreatorId,
                        TicketId=ticketHistory.TicketId
                    }
                );
                oldTicket.Priority = ticket.Priority;
            }

            if(oldTicket.Title != ticket.Title)
            {
                ticketHistory.OldValue = oldTicket.Title;
                ticketHistory.NewValue = ticket.Title;
                ticketHistory.Property = "Title";
                await _context.TicketHistories.AddAsync(
                    new TicketHistory
                    {
                        OldValue = ticketHistory.OldValue,
                        NewValue = ticketHistory.NewValue,
                        Property = ticketHistory.Property,
                        CreatorId = ticketHistory.CreatorId,
                        TicketId = ticketHistory.TicketId
                    }
                );
                oldTicket.Title = ticket.Title;
            }



                await _context.SaveChangesAsync();
            
            return Ok("Ticket Updated successfully");

        }


        //Delete
    }
}
