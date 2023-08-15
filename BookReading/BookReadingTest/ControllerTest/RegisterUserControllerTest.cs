using BookReading.Controllers;
using BookReading.Models;
using BookReading.Repository;
using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace BookReadingTest.ControllerTest
{
    
    public class RegisterUserControllerTest
    {
        private readonly IRegisterUserRepository _registerUser;

        public RegisterUserControllerTest()
        {
            _registerUser= A.Fake<IRegisterUserRepository>();
        }

        [Fact]
        public async void LoginTest()
        {
            //Arrange
            var user = new RegisterUserController(_registerUser);
            //Act
            var result = user.Login();
            //Assets
            result.Should().NotBeNull();


        }

        public async void SigupTest()
        {
            //Arrange
            var user = new RegisterUserController(_registerUser);
            //Act
            var result = user.Signup();
            //Assets
            result.Should().NotBeNull();


        }

    }
}
