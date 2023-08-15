using BookReading.Data;
using BookReading.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookReading.Repository
{
    public class SendInvitationRepository : ISendInvitationRepository
    {
       
        private readonly BookReadingContext _context;
    

        public SendInvitationRepository(BookReadingContext context)
        {
            _context=context;
        }
        public  async Task<List<string>> SendInvitation(string id)
        {

            var result = await _context.BookEvents.ToListAsync();
            List<string> l1=new List<string>();

            foreach (var item in result)
            {
      
                
                if(item.InviteByEmail==null)
                {
                    continue;
                }
                string[] emailList = item.InviteByEmail.Split(",");
                foreach (var email in emailList)
                {
                    if (String.Equals(email.ToUpper(), id.ToUpper()))
                    {
                        l1.Add(item.Title);
                       
                    }
                }
            }

            return l1;
        }


    }
}
