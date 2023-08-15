using BAL.Models;
using DAL.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace CampBooking.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CampController : ControllerBase
    {
   
        private readonly ICampRepository _camp;
        public CampController(ICampRepository camp)
        {
  
            _camp = camp;
        }
        [HttpGet]
        public IEnumerable<CampModel> GetCamp()
        {
            return _camp.Get();

        }



        [HttpGet("{In}/{Out}")]
        public ActionResult getStay(string In, string Out)
        {
          
            int weekDays = 0;
            int weekendDays = 0;
            int l=Convert.ToInt32(Convert.ToString(Convert.ToDateTime(Out.ToString()) - Convert.ToDateTime(In.ToString())).Replace(".00:00:00", ""));

            for (var i = 0; i < l; i++)
            {
                Console.WriteLine();

                if (Convert.ToDateTime(In.ToString()).AddDays(i).DayOfWeek == DayOfWeek.Monday || Convert.ToDateTime(In.ToString()).AddDays(i).DayOfWeek == DayOfWeek.Tuesday || Convert.ToDateTime(In.ToString()).AddDays(i).DayOfWeek == DayOfWeek.Wednesday || Convert.ToDateTime(In.ToString()).AddDays(i).DayOfWeek == DayOfWeek.Thursday)
                {
                    weekDays++;

                }
                else
                {
                    weekendDays++;
                }
            }

            return Ok(
                new {
                    WeekDays=weekDays,
                    WeekendDays=weekendDays
                    });
              
        }

        [HttpGet("{In}/{Out}/{Cpty}")]
        public IEnumerable<CampModel> FilterCamp(string In,string Out,int Cpty)
        {
            List<CampModel> camps = new List<CampModel>();

            foreach (var i in _camp.Get())
            {

                if (Convert.ToDateTime(In.ToString()) == i.Camp_avaliable_date && i.Booked == false)
                {
                        if (Cpty == 0 || Cpty <= i.Capacity)
                        {
                            camps.Add(i);
                        }
                }
            }
           camps.Sort((x, y) => x.Capacity.CompareTo(y.Capacity));
           return camps;
        }






        [Authorize]
        [HttpPost]
        public IEnumerable<CampModel> CreateCamp (CampModel camp)
        {
            _camp.Create(camp);
            return _camp.Get();

        }

        [HttpGet("{id}")]
        public  ActionResult<CampModel> GetCampById(int id)
        {
            var campModel = _camp.GetById(id);

            if (campModel == null)
            {
                return NotFound();
            }

            return campModel;
        }


   


        [Authorize]
        [HttpDelete("{id}")]
        public  void DeleteCamp(int id)
        {
            _camp.Delete(id);
        }

        [HttpPut("{id}")]
        public IEnumerable<CampModel> PutCamp(int id, CampModel campModel)
        {
              _camp.Update(id,campModel);
            return _camp.Get();

        }


    }
}
