using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.Employee;
using backend.Core.Dtos.Role;
using backend.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private ApplicationDBContext _context { get; }
        private IMapper _mapper { get; set; }

        public EmployeeController(ApplicationDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        //CRUD

        //Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateEmployee([FromBody] EmployeeCreateDto dto)
        {
            var newEmployee = _mapper.Map<EmployeePerso>(dto);
            await _context.EmployeesPerso.AddAsync(newEmployee);
            await _context.SaveChangesAsync();
            return Ok("Employee Created successfully");
        }

        //Read
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<EmployeeGetDto>>> GetEmployees()
        {
            var employees = await _context.EmployeesPerso.Include(employee => employee.Role).ToListAsync();
            var convertedEmployees = _mapper.Map<IEnumerable<EmployeeGetDto>>(employees);
            return Ok(convertedEmployees);
        }


        //Update
        //Delete
    }
}
