using backend.Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;



namespace backend.Core.Context
{
    public class ApplicationDBContext : IdentityDbContext<Employee>
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {
        }

        public DbSet<Ticket> Tickets { get; set; }

        public DbSet<TicketAttachment> TicketAttachments { get; set; }
        public DbSet<TicketComment> TicketComments { get; set; }
        public DbSet<TicketHistory> TicketHistories { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<NotificationsEmployees> NotificationsEmployees { get; set; }
        public DbSet<Notification> Notification { get; set; }
        public DbSet<ProjectsMembers> ProjectsMembers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);




            //Many to many relationship
            //An employee can work on several projects and a project can have several employees
            modelBuilder.Entity<Employee>()
                .HasMany(employee => employee.Projects)
                .WithMany(project => project.Members)
                .UsingEntity<ProjectsMembers>(
                projectMember => projectMember.HasOne(prop => prop.Project).WithMany().HasForeignKey(prop => prop.ProjectID),
                projectMember=> projectMember.HasOne(prop => prop.Employee).WithMany().HasForeignKey(prop=> prop.EmployeeId),
                projectMember =>
                {
                    projectMember.HasKey(prop => new { prop.ProjectID, prop.EmployeeId });
                    projectMember.Property(prop => prop.DateAdded).HasDefaultValueSql("GETUTCDATE()");
                }
                );

            //Many to one relationship
            //project to manager
            modelBuilder.Entity<Project>()
                .HasOne(project => project.Manager)
                .WithMany(employee => employee.ManagedProjects)
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


            modelBuilder.Entity<NotificationsEmployees>()
                .HasOne(notificationsEmployees => notificationsEmployees.Notification)
                .WithMany(notification => notification.NotificationsEmployees)
                .HasForeignKey(notificationsEmployees => notificationsEmployees.NotificationId);

            modelBuilder.Entity<NotificationsEmployees>()
                .HasOne(notificationsEmployees => notificationsEmployees.ToEmployee)
                .WithMany(employee => employee.NotificationsEmployees)
                .HasForeignKey(notificationsEmployees => notificationsEmployees.ToEmployeeId);


            modelBuilder.Entity<NotificationsEmployees>()
                .HasKey(notificationsEmployees => 
                new { notificationsEmployees.NotificationId,notificationsEmployees.ToEmployeeId });




            //To change the default names of Identity tables
            modelBuilder.Entity<Employee>(
                entity => entity.ToTable(name: "Employees"));

            modelBuilder.Entity<IdentityRole>(
               entity => entity.ToTable(name: "Roles"));

            modelBuilder.Entity<IdentityUserRole<string>>(
               entity => entity.ToTable(name: "EmployeesRoles"));

            modelBuilder.Entity<IdentityUserClaim<string>>(
               entity => entity.ToTable(name: "EmployeesClaims"));

            modelBuilder.Entity<IdentityUserLogin<string>>(
               entity => entity.ToTable(name: "EmployeesLogins"));

            modelBuilder.Entity<IdentityRoleClaim<string>>(
               entity => entity.ToTable(name: "RolesClaims"));

            modelBuilder.Entity<IdentityUserToken<string>>(
               entity => entity.ToTable(name: "EmployeesTokens"));

            

        }


    }
}
