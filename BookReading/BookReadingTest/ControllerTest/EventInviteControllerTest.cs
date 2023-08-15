using BookReading.Controllers;
using BookReading.Data;
using BookReading.Models;
using BookReading.Repository;
using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace BookReadingTest.ControllerTest
{
    public class EventInviteControllerTest
    {
        private readonly ISendInvitationRepository _sendInvitation;

        public EventInviteControllerTest()
        {
            _sendInvitation= A.Fake<ISendInvitationRepository>();
        }

        private async Task<BookReadingContext> GetDbContext()
        {
            var options = new DbContextOptionsBuilder<BookReadingContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            var databaseContext = new BookReadingContext(options);
            databaseContext.Database.EnsureCreated();
            if (await databaseContext.BookEvents.CountAsync() < 0)
            {
                for (int i = 0; i < 10; i++)
                {
                    databaseContext.BookEvents.Add(

                        new BookEventModel()
                        {
                            Email = "sumit.sahu@nagarro.com",
                            Title = "potter",
                            Date = DateTime.Parse("12-09-2022"),
                            StartTime = DateTime.Parse("00:00:00"),
                            Location = "Dabra",
                            Type = EType.Public
                        });
                    await databaseContext.SaveChangesAsync();
                }
            }
            return databaseContext;

        }

        [Theory]
        [InlineData("Harry Potter")]
        public async void IndexTest(string id)
        {
            //Arrange
            var dbContext = await GetDbContext();
            var invite = new EventInviteController(_sendInvitation, dbContext);
            //Act
            var result = invite.Index(id);
            //Assets
            result.Should().BeOfType<Task<IActionResult>>();
        }
    }
}
