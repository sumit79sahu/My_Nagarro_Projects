using BAL.Models;

namespace DAL.Repository.classes
{
    public interface IAuthenticationRepository
    {
        AdminModel Verify(string email);
    }
}