using BAL.Models;
using DAL.Data;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repository
{
    public class CampRepository : ICampRepository
    {
        private readonly CampBookingContext _context;

        public CampRepository(CampBookingContext context)
        {
            _context = context;
        }
        public IEnumerable<CampModel> Get()
        {
            return _context.Camps.ToList();
        }


        public void Create(CampModel camp)
        {
            _context.Camps.Add(camp);
            _context.SaveChanges();

        }

        public CampModel? GetById(int id)
        {
            var campModel = _context.Camps.Find(id);
            return campModel;
        }

        public void Delete(int id)
        {
            var campModel =  _context.Camps.Find(id);
            if (campModel == null)
            {
                return;
            }
            var booking = _context.Bookings.FirstOrDefault(data => data.Camp_Id == id);

           
            if (booking!=null)
            {
                var feedback = _context.Feedbacks.FirstOrDefault(data => data.Booking_Id == booking.Booking_Id);
                if (feedback!=null) 
                {
                    _context.Feedbacks.Remove(feedback);
                }
                _context.Bookings.Remove(booking);
            }
            _context.Camps.Remove(campModel);
 
             _context.SaveChanges();
        }

        public void  Update(int id, CampModel campModel)
        {

            var camp = _context.Camps.Find(id);
            if (camp != null)
            {
                camp.Camp_name = campModel.Camp_name;
                camp.Camp_price = campModel.Camp_price;
                camp.Capacity = campModel.Capacity;
                camp.Camp_avaliable_date=campModel.Camp_avaliable_date;
                camp.Camp_img=campModel.Camp_img;
                camp.Description= campModel.Description;
                camp.Booked = campModel.Booked;
                _context.SaveChanges();
            }
         }



    }
}
