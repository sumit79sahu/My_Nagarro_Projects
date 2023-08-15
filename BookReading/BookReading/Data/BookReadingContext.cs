using BookReading.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookReading.Data
{
    public class BookReadingContext:IdentityDbContext<ApplicationUser>
    {
        public ILoggerFactory loggerFactory = LoggerFactory.Create(builder => builder.AddConsole());
        public BookReadingContext(DbContextOptions<BookReadingContext> options) : base(options)
        {
            
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLoggerFactory(loggerFactory)  //tie-up DbContext with LoggerFactory object
                .EnableSensitiveDataLogging()
                .UseSqlServer("server=IN-BK1D5S3; database=BookReading; trusted_connection=true;");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //Seeding a  'Administrator' role to AspNetRoles table
            modelBuilder.Entity<Microsoft.AspNetCore.Identity.IdentityRole>().HasData(new IdentityRole { Id = "1", Name = "Admin", NormalizedName = "ADMIN".ToUpper() });

            //a hasher to hash the password before seeding the user to the db
            var hasher = new PasswordHasher<IdentityUser>();

            //Seeding the User to AspNetUsers table

            modelBuilder.Entity<ApplicationUser>().HasData(new ApplicationUser
            {
                Id = "ae512976-0af2-47b9-9fd4-a1ee7a9e5fa8",
                UserName = "sumit.sahu@nagarro.com",
                NormalizedUserName = "SUMIT.SAHU@NAGARRO.COM",
                Email = "sumit.sahu@nagarro.com",
                NormalizedEmail = "SUMIT.SAHU@NAGARRO.COM",
                FullName = "Sumit Sahu",
                PasswordHash = hasher.HashPassword(null, "Sumit@123")
            });



            modelBuilder.Entity<ApplicationUser>().HasData(new ApplicationUser
            {
                Id = "77ee2800-d680-47c9-a229-6cf3878a34f6",
                UserName = "rajiv.gogia@nagarro.com",
                NormalizedUserName = "RAJIV.GOGIA@NAGARRO.COM",
                Email = "rajiv.gogia@nagarro.com",
                NormalizedEmail = "RAJIV.GOGIA@NAGARRO.COM",
                FullName = "Rajiv Gogia",
                PasswordHash = hasher.HashPassword(null, "Rajiv@123")
            });

            //Seeding the relation between our user and role to AspNetUserRoles table
            modelBuilder.Entity<IdentityUserRole<string>>().HasData(
                new IdentityUserRole<string>
                {
                    RoleId = "1",
                    UserId = "ae512976-0af2-47b9-9fd4-a1ee7a9e5fa8"
                }
                 );

            modelBuilder.Entity<IdentityUserRole<string>>().HasData(
                         new IdentityUserRole<string>
                         {
                             RoleId = "1",
                             UserId = "77ee2800-d680-47c9-a229-6cf3878a34f6"
                         }
                         );
        }
        public DbSet<BookEventModel> BookEvents { get; set; }
        public DbSet<CommentModel> Comments { get; set; }
    }
}
