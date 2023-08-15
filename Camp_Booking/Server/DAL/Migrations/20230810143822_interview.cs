using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class interview : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "admin",
                keyColumn: "Admin_Email",
                keyValue: "sumit.sahu@nagarro.com",
                column: "Admin_Password",
                value: "riTdZHBf6WwlWwtV+U+fI8nGNpxWVj2JGS91VS0SU/4tx3ko");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "admin",
                keyColumn: "Admin_Email",
                keyValue: "sumit.sahu@nagarro.com",
                column: "Admin_Password",
                value: "gqZRDgIqDOcuYubEmXv8OlgRtKrQeWrUg4ANHsxVruNAHBGT");
        }
    }
}
