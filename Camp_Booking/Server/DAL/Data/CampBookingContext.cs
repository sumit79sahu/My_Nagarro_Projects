using BAL.Models;
using DAL.Helper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Data
{
    public class CampBookingContext:DbContext
    {
        private readonly IConfiguration _configuration;
        public CampBookingContext(DbContextOptions<CampBookingContext> options, IConfiguration configuration) :base(options) 
        {
            _configuration = configuration;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(_configuration.GetConnectionString("DefaultConnection"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<CampModel>()
                .HasKey(m=>m.Camp_id);
            modelBuilder.Entity<AdminModel>()
               .HasKey(m => m.Admin_Email);
            modelBuilder.Entity<CampBookingModel>()
               .HasKey(m => m.Booking_Id);
            modelBuilder.Entity<CampFeedbackModel>()
               .HasKey(m => m.Feedback_Id);
            ;

            //Seeding a  'Administrator' role to AspNetRoles table
            var password = PasswordHasher.HashPassword("Sumit@123");
            modelBuilder.Entity<AdminModel>().HasData(new AdminModel {Admin_Name = "sumit", Admin_Email="sumit.sahu@nagarro.com",Admin_Password=password });
        }

        public DbSet<CampModel> Camps { get; set; } = null!;
        public DbSet<CampBookingModel> Bookings { get; set; } = null!;
        public DbSet<CampFeedbackModel> Feedbacks { get; set; } = null!;

        public DbSet<AdminModel> admin { get; set; } = null!;
    }
}
