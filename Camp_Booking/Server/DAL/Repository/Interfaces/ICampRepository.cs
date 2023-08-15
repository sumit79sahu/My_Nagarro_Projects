using BAL.Models;

namespace DAL.Repository
{
    public interface ICampRepository
    {
        void Create(CampModel camp);
        IEnumerable<CampModel> Get();
        CampModel? GetById(int id);
         void Delete(int id);
        void Update(int id, CampModel campModel);
    }
}