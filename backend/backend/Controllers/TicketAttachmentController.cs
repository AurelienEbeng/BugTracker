using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.Project;
using backend.Core.Dtos.TicketAttachment;
using backend.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketAttachmentController : ControllerBase
    {
        private ApplicationDBContext _context { get; }
        private IMapper _mapper { get; set; }

        public TicketAttachmentController(ApplicationDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        //CRUD

        //Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateTicketAttachment([FromBody] TicketAttachmentCreateDto dto)
        {
            var newTicketAttachment = _mapper.Map<TicketAttachment>(dto);
            await _context.TicketAttachments.AddAsync(newTicketAttachment);
            await _context.SaveChangesAsync();
            return Ok("Ticket Attachment Created successfully");
        }

        //Read
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<TicketAttachmentGetDto>>> GetTicketAttachments()
        {
            var ticketAttachments = await _context.TicketAttachments.Include(ticketAttachment => ticketAttachment.Ticket).ToListAsync();
            var convertedTicketAttachments = _mapper.Map<IEnumerable<TicketAttachmentGetDto>>(ticketAttachments);
            return Ok(convertedTicketAttachments);
        }


        //Update
        //Delete
    }
}
