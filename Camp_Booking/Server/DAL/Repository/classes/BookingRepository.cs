using BAL.Models;
using DAL.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repository
{
    public class BookingRepository : IBookingRepository
    {
        private readonly CampBookingContext _context;

        public BookingRepository(CampBookingContext context)
        {
            _context = context;
        }
        public IEnumerable<CampBookingModel> Get()
        {
            return _context.Bookings.ToList();
        }

        public CampBookingModel? GetById(string id)
        {
                var campBookingModel = _context.Bookings.Find(id);
                return campBookingModel;
        }


        public void Create(CampBookingModel booking)
        {
            _context.Bookings.Add(booking);
            _context.SaveChanges();

        }

        public void Delete(string id)
        {

            var bookingModel = _context.Bookings.Find(id);
            if (bookingModel == null)
            {
                return;
            }
            _context.Bookings.Remove(bookingModel);
            _context.SaveChanges();

        }
    }
}
