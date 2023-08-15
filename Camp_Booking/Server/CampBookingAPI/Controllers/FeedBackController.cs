using BAL.Models;
using DAL.Repository.classes;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;

namespace CampBooking.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedBackRepository _feedback;


        public FeedbackController(IFeedBackRepository feedback)
        {
            _feedback = feedback;
        }
        [HttpPost]
        public IEnumerable<CampFeedbackModel> CreateFeedback(CampFeedbackModel feedbackModel)
        {
            _feedback.Create(feedbackModel);
            return _feedback.Get();
        }

        [HttpGet("{bookingId}")]
        public ActionResult GetFeedbackById(string bookingId)
        {
            var feedback = _feedback.GetById(bookingId);
            if (feedback == null)
            {
                return Ok(null) ;
            }
            return Ok(feedback);
        }

        [HttpPut("{Id}")]
        public IEnumerable<CampFeedbackModel> PutCamp(int id, CampFeedbackModel feedModel)
        {
            _feedback.Update(id, feedModel);
            return _feedback.Get();

        }

    }
}
