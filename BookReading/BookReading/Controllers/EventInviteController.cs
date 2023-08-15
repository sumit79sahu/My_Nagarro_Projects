using BookReading.Data;
using BookReading.Models;
using BookReading.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookReading.Controllers
{
    [Authorize(Roles="Admin,User")]
    public class EventInviteController : Controller
    {
        private readonly ISendInvitationRepository _sendInvitation;
        private readonly BookReadingContext _context;

        public EventInviteController(ISendInvitationRepository sendInvitation, BookReadingContext context)
        {
            _sendInvitation = sendInvitation;
            _context = context;
        }

        [HttpGet]
        [Authorize(Roles ="Admin,User")]
        public async Task<IActionResult> Index(string id)
        {
            List<BookEventModel> book = new List<BookEventModel>();
            List<string> l1=await _sendInvitation.SendInvitation(id);
            foreach (var item in l1)
            {
                var bookEventModel = await _context.BookEvents
                  .FirstOrDefaultAsync(m => m.Title == item);

                book.Add(bookEventModel);
            }
                return View(book);       
        }
    }
}
