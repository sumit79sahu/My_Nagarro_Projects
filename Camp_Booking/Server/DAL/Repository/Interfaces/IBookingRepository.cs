using BAL.Models;

namespace DAL.Repository
{
    public interface IBookingRepository
    {
        void Create(CampBookingModel booking);
        IEnumerable<CampBookingModel> Get();
        CampBookingModel? GetById(string id);
        void Delete(string id);
    }
}