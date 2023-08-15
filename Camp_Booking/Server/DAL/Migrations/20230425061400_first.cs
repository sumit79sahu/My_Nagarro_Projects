using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class first : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "admin",
                columns: table => new
                {
                    Admin_Email = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Admin_Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Admin_Password = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_admin", x => x.Admin_Email);
                });

            migrationBuilder.CreateTable(
                name: "Bookings",
                columns: table => new
                {
                    Booking_Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Camp_Id = table.Column<int>(type: "int", nullable: false),
                    Billing_Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Zipcode = table.Column<int>(type: "int", nullable: false),
                    Cellphone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Total_Amount = table.Column<double>(type: "float", nullable: false),
                    Total_Stay = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bookings", x => x.Booking_Id);
                });

            migrationBuilder.CreateTable(
                name: "Camps",
                columns: table => new
                {
                    Camp_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Camp_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Capacity = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Camp_img = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Camp_price = table.Column<double>(type: "float", nullable: false),
                    Camp_avaliable_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Booked = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Camps", x => x.Camp_id);
                });

            migrationBuilder.CreateTable(
                name: "Feedbacks",
                columns: table => new
                {
                    Feedback_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Camp_Id = table.Column<int>(type: "int", nullable: false),
                    Booking_Id = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Rating = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Feedbacks", x => x.Feedback_Id);
                });

            migrationBuilder.InsertData(
                table: "admin",
                columns: new[] { "Admin_Email", "Admin_Name", "Admin_Password" },
                values: new object[] { "sumit.sahu@nagarro.com", "sumit", "gqZRDgIqDOcuYubEmXv8OlgRtKrQeWrUg4ANHsxVruNAHBGT" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "admin");

            migrationBuilder.DropTable(
                name: "Bookings");

            migrationBuilder.DropTable(
                name: "Camps");

            migrationBuilder.DropTable(
                name: "Feedbacks");
        }
    }
}
