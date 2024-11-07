using backend.Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;



namespace backend.Core.Context
{
    public class ApplicationDBContext : IdentityDbContext<User, Role, string,
        IdentityUserClaim<string>, UserRole, IdentityUserLogin<string>,
        IdentityRoleClaim<string>, IdentityUserToken<string>>
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {
        }

        public DbSet<Ticket> Tickets { get; set; }

        public DbSet<TicketAttachment> TicketAttachments { get; set; }
        public DbSet<TicketComment> TicketComments { get; set; }
        public DbSet<TicketHistory> TicketHistories { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<ProjectMember> ProjectMembers { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);




            //Many to many relationship
            // A user can work on several projects and a project can have several users
            modelBuilder.Entity<User>()
                .HasMany(employee => employee.Projects)
                .WithMany(project => project.Members)
                .UsingEntity<ProjectMember>(
                projectMember => projectMember.HasOne(prop => prop.Project).WithMany().HasForeignKey(prop => prop.ProjectId),
                projectMember=> projectMember.HasOne(prop => prop.Member).WithMany().HasForeignKey(prop=> prop.MemberId),
                projectMember =>
                {
                    projectMember.HasKey(prop => new { prop.ProjectId, prop.MemberId });
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
                .HasOne(ticketHistory => ticketHistory.Creator)
                .WithMany(employee => employee.TicketHistories)
                .HasForeignKey(ticketHistory => ticketHistory.CreatorId);

            //ticket attachment to ticket
            modelBuilder.Entity<TicketAttachment>()
                .HasOne(ticketAttachment => ticketAttachment.Ticket)
                .WithMany(ticket => ticket.TicketAttachments)
                .HasForeignKey(ticketAttachment => ticketAttachment.TicketId);

            //ticket attachment to user
            modelBuilder.Entity<TicketAttachment>()
                .HasOne(ticketAttachment => ticketAttachment.Uploader)
                .WithMany(employee => employee.TicketAttachments)
                .HasForeignKey(ticketAttachment => ticketAttachment.UploaderId);

            // notification to user
            modelBuilder.Entity<Notification>()
                .HasOne(notification => notification.Receiver)
                .WithMany(user => user.Notifications)
                .HasForeignKey(notification =>  notification.ReceiverId);

            modelBuilder.Entity<User>(b =>
            {
                b.HasMany(e => e.UserRoles)
                .WithOne(e => e.Employee)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();
            });

            modelBuilder.Entity<Role>(b =>
            {
                b.HasMany(e => e.UserRoles)
                    .WithOne(e => e.Role)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();
            });

            // AssignedDeveloperId Foreign key
            modelBuilder.Entity<Ticket>(b =>
            {
                b.HasOne(ticket => ticket.AssignedDeveloper)
                .WithMany(employee => employee.AssignedTickets)
                .HasForeignKey(ticket => ticket.AssignedDeveloperId);
            });

            // CreatorID Foreign key
            modelBuilder.Entity<Ticket>(b =>
            {
                b.HasOne(ticket => ticket.Creator)
                .WithMany(employee => employee.CreatedTickets)
                .HasForeignKey(ticket => ticket.CreatorId);
            });

            //To change the default names of Identity tables
            modelBuilder.Entity<User>(
                entity => entity.ToTable(name: "Users"));

            modelBuilder.Entity<Role>(
               entity => entity.ToTable(name: "Roles"));

            modelBuilder.Entity<UserRole>(
               entity => entity.ToTable(name: "UserRoles"));

            modelBuilder.Entity<IdentityUserClaim<string>>(
               entity => entity.ToTable(name: "UserClaims"));

            modelBuilder.Entity<IdentityUserLogin<string>>(
               entity => entity.ToTable(name: "UserLogins"));

            modelBuilder.Entity<IdentityRoleClaim<string>>(
               entity => entity.ToTable(name: "RoleClaims"));

            modelBuilder.Entity<IdentityUserToken<string>>(
               entity => entity.ToTable(name: "UserTokens"));

        }


    }
}
