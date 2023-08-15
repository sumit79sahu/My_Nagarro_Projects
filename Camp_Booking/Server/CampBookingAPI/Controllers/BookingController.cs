using BAL.Models;
using DAL.Data;
using DAL.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CampBooking.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        
        private readonly IBookingRepository _booking;
        public BookingController(IBookingRepository booking)
        {
          
            _booking = booking;
        }


        [HttpGet]
        public IEnumerable<CampBookingModel>GetBooking()
        {
            return  _booking.Get();
        }

        [HttpPost]
        public IEnumerable<CampBookingModel> CreateBooking(CampBookingModel booking)
        {
            _booking.Create(booking);
            return _booking.Get();
        }



        [HttpGet("{id}")]
        public CampBookingModel? GetBookingById(string id)
        {
            var bookingModel = _booking.GetById(id);

            if (bookingModel == null)
            {
                return null;
            }

            return bookingModel;
        }


        [HttpDelete("{id}")]
        public void  DeleteBooking(string id)
        {
            _booking.Delete(id);
        }
    }
}
