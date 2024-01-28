using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.Project;
using backend.Core.Dtos.TicketAttachment;
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
        public async Task<IActionResult> CreateTicketAttachment([FromForm] TicketAttachmentCreateDto dto, IFormFile pdfFile)
        {
            //First => save pdf to server
            // Then => save url into our entity
            var fiveMegaByte = 5 * 1024 * 1024;
            var pdfMimeType = "application/pdf";
            if(pdfFile.Length> fiveMegaByte || pdfFile.ContentType != pdfMimeType)
            {
                return BadRequest("File is not valid");
            }

            var fileUrl = Guid.NewGuid().ToString() + ".pdf";
            var filePath = Path.Combine(Directory.GetCurrentDirectory(),"Documents","pdfs", fileUrl);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await pdfFile.CopyToAsync(stream);
            }

            var newTicketAttachment = _mapper.Map<TicketAttachment>(dto);
            newTicketAttachment.fileUrl = fileUrl;
            newTicketAttachment.DateUploaded = DateTime.Now;
            await _context.TicketAttachments.AddAsync(newTicketAttachment);
            await _context.SaveChangesAsync();
            return Ok("Ticket Attachment Created successfully");
        }

        //Read
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<TicketAttachmentGetDto>>> GetTicketAttachments()
        {
            var ticketAttachments = await _context.TicketAttachments.Include(ticketAttachment => ticketAttachment.Ticket)
                                                                    .Include(ticketAttachment => ticketAttachment.Uploader).ToListAsync();
            var convertedTicketAttachments = _mapper.Map<IEnumerable<TicketAttachmentGetDto>>(ticketAttachments);
            return Ok(convertedTicketAttachments);
        }

        //Read by ticketId
        [HttpGet]
        [Route("Get/{ticketId}")]
        public async Task<ActionResult<IEnumerable<TicketAttachmentGetDto>>> GetTicketAttachment(int ticketId)
        {
            var ticketAttachment = await _context.TicketAttachments
                                                 .Include(ticketAttachment => ticketAttachment.Ticket)
                                                 .Include(ticketAttachment => ticketAttachment.Uploader)
                                                 .Where(ticketAttachment=> ticketAttachment.TicketId==ticketId)
                                                 .ToListAsync();
            var convertedTicketAttachment = _mapper.Map<IEnumerable<TicketAttachmentGetDto>>(ticketAttachment);
            return Ok(convertedTicketAttachment);
        }


        //Read (Download Pdf File)
        [HttpGet]
        [Route("download/{url}")]
        public IActionResult DownloadPdfFile(string url)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Documents", "pdfs", url);

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound("File Not Found");
            }

            var pdfBytes = System.IO.File.ReadAllBytes(filePath);
            var file = File(pdfBytes, "application/pdf", url);
            return file;
        }
        //Update
        //Delete
    }
}
