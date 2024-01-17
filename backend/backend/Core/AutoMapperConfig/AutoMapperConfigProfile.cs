using AutoMapper;
using backend.Core.Dtos.Employee;
using backend.Core.Dtos.Project;
using backend.Core.Dtos.Role;
using backend.Core.Dtos.Ticket;
using backend.Core.Dtos.TicketAttachment;
using backend.Core.Dtos.TicketComment;
using backend.Core.Dtos.TicketHistory;
using backend.Core.Entities;
using Microsoft.AspNetCore.Authorization.Infrastructure;

namespace backend.Core.AutoMapperConfig
{
    public class AutoMapperConfigProfile: Profile
    {
        public AutoMapperConfigProfile()
        {
            // Role
            CreateMap<RoleCreateDto, RolePerso>();
            CreateMap<RolePerso, RoleGetDto>();

            //Employee
            CreateMap<EmployeeCreateDto, Employee>();
            CreateMap<Employee, EmployeeGetDto>()
                .ForMember(dest => dest.RoleName, opt=> opt.MapFrom(src=> src.Role.Name));

            //Project
            CreateMap<ProjectCreateDto, Project>();
            CreateMap<Project, ProjectGetDto>()
                .ForMember(dest => dest.ManagerName, opt => opt.MapFrom(src => src.Manager.Name));

            //Ticket
            CreateMap<TicketCreateDto, Ticket>();
            CreateMap<Ticket, TicketGetDto>()
                .ForMember(dest=> dest.ProjectName, opt => opt.MapFrom(src=> src.Project.Name));

            //TicketAttachment
            CreateMap<TicketAttachmentCreateDto,TicketAttachment>();
            CreateMap<TicketAttachment, TicketAttachmentGetDto>()
                .ForMember(dest => dest.TicketTitle, opt => opt.MapFrom(src => src.Ticket.Title))
                .ForMember(dest => dest.UploaderName, opt => opt.MapFrom(src => src.Uploader.Name));

            //TicketComment
            CreateMap<TicketCommentCreateDto, TicketComment>();
            CreateMap<TicketComment, TicketCommentGetDto>()
                .ForMember(dest => dest.TicketTitle, opt => opt.MapFrom(src => src.Ticket.Title));
            //TicketHistory
            CreateMap<TicketHistoryCreateDto,TicketHistory>();
            CreateMap<TicketHistory, TicketHistoryGetDto>()
                .ForMember(dest => dest.TicketTitle, opt => opt.MapFrom(src => src.Ticket.Title))
                .ForMember(dest => dest.EmployeeName, opt => opt.MapFrom(src => src.Employee.Name));
        }
    }
}
