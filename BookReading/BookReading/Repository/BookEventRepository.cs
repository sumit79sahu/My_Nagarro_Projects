using BookReading.Data;
using BookReading.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookReading.Repository
{
    public class BookEventRepository : IBookEventRepository
    {
        private readonly BookReadingContext _context;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public BookEventRepository(BookReadingContext context, SignInManager<ApplicationUser> signInManager)
        {
            _context = context;
            _signInManager = signInManager;
        }


        public IList<BookEventModel> BookList()
        {
            return _context.BookEvents.OrderByDescending(m => m.Date).ToList();
        }

        public BookEventModel BookDetails(string id)
        {
            return _context.BookEvents.FirstOrDefault(Data=>Data.Title==id);
        }

        public void  BookComments( CommentModel commentModel)
        {

            _context.Add(commentModel);
             _context.SaveChanges();
        }

        public bool FindBook(BookEventModel bookEventModel)
        {
            return _context.BookEvents.Any(Data => Data.Title == bookEventModel.Title);
        }

        public BookEventModel FindBook(string id)
        {
            return _context.BookEvents.Find(id);
        }



        public void CreateBook(BookEventModel bookEventModel)
        {
            _context.Add(bookEventModel);
             _context.SaveChanges();
        }



        public void UpdateBook(BookEventModel bookEventModel)
        {
            _context.Update(bookEventModel);
            _context.SaveChanges();
        }

        public void DeleteBook(BookEventModel bookEventModel)
        {
            _context.Remove(bookEventModel);
            _context.SaveChanges();
        }

    }
}
