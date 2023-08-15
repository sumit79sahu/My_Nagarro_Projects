using BookReading.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookReading.Repository
{
    public interface ISendInvitationRepository
    {
         Task<List<string>> SendInvitation(string id);
    }
}