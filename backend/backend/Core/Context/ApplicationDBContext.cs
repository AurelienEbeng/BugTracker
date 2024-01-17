using backend.Core.Entities;
using Microsoft.EntityFrameworkCore;



namespace backend.Core.Context
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {
        }

        public DbSet<RolePerso> RolesPerso { get; set; }
        public DbSet<Ticket> Tickets { get; set; }

        public DbSet<TicketAttachment> TicketAttachments { get; set; }
        public DbSet<TicketComment> TicketComments { get; set; }
        public DbSet<TicketHistory> TicketHistories { get; set; }
        public DbSet<EmployeePerso> EmployeesPerso { get; set; }
        public DbSet<Project> Projects { get; set; } 

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //Many to one relationship
            //An employee has one role while a role has many employees
            modelBuilder.Entity<EmployeePerso>()
                .HasOne(employee => employee.Role)
                .WithMany(role => role.Employees)
                .HasForeignKey(employee => employee.RoleId);
            
            //Many to many relationship
            //An employee can work on several projects and a project can have several employees
            modelBuilder.Entity<EmployeePerso>()
                .HasMany(employee => employee.Projects)
                .WithMany(project => project.Members)
                .UsingEntity(j => j.ToTable("ProjectMember"));

            //project to manager
            modelBuilder.Entity<Project>()
                .HasOne(project => project.Manager)
                .WithMany(employee => employee.ManageProjects)
                .HasForeignKey(project => project.ManagerId);


            //ticket to project
            modelBuilder.Entity<Ticket>()
                .HasOne(ticket => ticket.Project)
                .WithMany(project => project.Tickets)
                .HasForeignKey(ticket => ticket.ProjectId);

            //ticket comment to ticket
            modelBuilder.Entity<TicketComment>()
                .HasOne(ticketComment => ticketComment.Ticket)
                .WithMany(ticket => ticket.TicketComments)
                .HasForeignKey(ticketComment => ticketComment.TicketId);

            //ticket comment to employee or commenter
            modelBuilder.Entity<TicketComment>()
                .HasOne(ticketComment => ticketComment.Commenter)
                .WithMany(employee => employee.TicketComments)
                .HasForeignKey(ticketComment => ticketComment.CommenterId);

            //ticket history to ticket
            modelBuilder.Entity<TicketHistory>()
                .HasOne(ticketHistory => ticketHistory.Ticket)
                .WithMany(ticket => ticket.TicketHistories)
                .HasForeignKey(ticketHistory => ticketHistory.TicketId);

            //ticket history to employee 
            modelBuilder.Entity<TicketHistory>()
                .HasOne(ticketHistory => ticketHistory.Employee)
                .WithMany(employee => employee.TicketHistories)
                .HasForeignKey(ticketHistory => ticketHistory.EmployeeId);

            //ticket attachment to ticket
            modelBuilder.Entity<TicketAttachment>()
                .HasOne(ticketAttachment => ticketAttachment.Ticket)
                .WithMany(ticket => ticket.TicketAttachments)
                .HasForeignKey(ticketAttachment => ticketAttachment.TicketId);

            //ticket attachment to employee
            modelBuilder.Entity<TicketAttachment>()
                .HasOne(ticketAttachment => ticketAttachment.Uploader)
                .WithMany(employee => employee.TicketAttachments)
                .HasForeignKey(ticketAttachment => ticketAttachment.UploaderId);

            ////convert from string to int
            //modelBuilder.Entity<Company>()
            //    .Property(company => company.Size)
            //    .HasConversion<string>();

            //you need to add migration and update database


        }


    }
}
