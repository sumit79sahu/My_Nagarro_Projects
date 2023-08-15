using BAL.Models;
using DAL.Data;


namespace DAL.Repository.classes
{
    public class AuthenticationRepository : IAuthenticationRepository
    {
        private readonly CampBookingContext _context;
        public AuthenticationRepository(CampBookingContext context)
        {
            _context = context;
        }

        public AdminModel Verify(string email)
        {
            var admin = _context.admin.FirstOrDefault(x => x.Admin_Email == email);
            return admin;
        }


    }
}
