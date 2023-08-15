/*using BookReading.Controllers;
using BookReading.Data;
using BookReading.Models;
using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace BookReadingTest.ControllerTest
{
    public class BookEventControllerTest
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        public BookEventControllerTest()
        {

            _signInManager = A.Fake<SignInManager<ApplicationUser>>();
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


        [Fact]
        public async void IndexTest()
        {
            //Arrange
            var dbContext = await GetDbContext();
            var bookController = new BookEventController(dbContext, _signInManager);
            //Act
            var result = bookController.Index();
            //Assert
            result.Should().BeOfType<Task<IActionResult>>();
        }



        [Theory]
        [InlineData("harry potter")]
        [InlineData("")]
        public async void DetailsTest(string id)
        {
            //Arrange
            var dbContext = await GetDbContext();
            var bookController = new BookEventController(dbContext, _signInManager);
            //Act
            var result = bookController.Details(id);
            //Assert
            result.Should().BeOfType<Task<IActionResult>>();
            result.Should().NotBeNull();
        }

        [Theory]
        [InlineData("harry potter")]
        [InlineData("")]
        public async void CommentsTest(string id)
        {
            //Arrange
            var dbContext = await GetDbContext();
            var bookController = new BookEventController(dbContext, _signInManager);
            var comments = new CommentModel() { Name = "sumit.sahu@nagarro.com", Comment = "Superb", Title = id };
            //Act
            var result = bookController.Comments(id, comments);
            //Assert
            result.Should().BeOfType<Task<IActionResult>>();
            result.Should().NotBeNull();
        }

        [Fact]
        public async void CreateTest()
        {
            //Arrange
            var dbContext = await GetDbContext();
            var bookController = new BookEventController(dbContext, _signInManager);
            var book = new BookEventModel()
            {
                Email = "sumit.sahu@nagarro.com",
                Title = "potter",
                Date = DateTime.Parse("12-09-2022"),
                StartTime = DateTime.Parse("00:00:00"),
                Location = "Dabra",
                Type = EType.Public

            };
            //Act
            var result = bookController.Create(book);
            //Assert
            result.Should().BeOfType<Task<IActionResult>>();
            result.Should().NotBeNull();
        }

        [Theory]
        [InlineData("Harry Potter")]
        public async void EditTest(string id)
        {
            var dbContext = await GetDbContext();
            var bookController = new BookEventController(dbContext, _signInManager);
            //Act
            var result = bookController.Edit(id);
            //Assert
            result.Should().BeOfType<Task<IActionResult>>();
  
        }






    }
}
*/