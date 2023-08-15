using BAL.Models;

namespace DAL.Repository.classes
{
    public interface IFeedBackRepository
    {
        void Create(CampFeedbackModel feedbackModel);
        IEnumerable<CampFeedbackModel> Get();
        CampFeedbackModel? GetById(string bookingId);
        void Update(int id, CampFeedbackModel feedbackModel);

    }
}