using BAL.Models;
using DAL.Data;


namespace DAL.Repository.classes
{
    public class FeedBackRepository : IFeedBackRepository
    {
        private readonly CampBookingContext _context;
        public FeedBackRepository(CampBookingContext context)
        {
            _context = context;
        }

        public IEnumerable<CampFeedbackModel> Get()
        {
            return _context.Feedbacks.ToList();
        }

        public void Create(CampFeedbackModel feedbackModel)
        {
            _context.Feedbacks.Add(feedbackModel);
            _context.SaveChanges();
        }

        public CampFeedbackModel? GetById(string bookingId)
        {
            var feedModel = _context.Feedbacks.FirstOrDefault(x => x.Booking_Id == bookingId);
            return feedModel;
        }
        public void Update(int id,CampFeedbackModel feedbackModel)
        {

            var feed = _context.Feedbacks.Find(id);
            if (feed != null)
            {
                feed.Camp_Id = feedbackModel.Camp_Id;
                feed.Booking_Id = feedbackModel.Booking_Id;
                feed.Rating = feedbackModel.Rating;
                _context.SaveChanges();
            }

        }
    }
}
