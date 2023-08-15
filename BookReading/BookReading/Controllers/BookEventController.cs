using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using BookReading.Data;
using BookReading.Models;
using Microsoft.AspNetCore.Identity;
using BookReading.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace BookReading.Controllers
{
    
    public class BookEventController : Controller
    {
        private readonly BookReadingContext _context;
        private  readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IBookEventRepository _bookEvent;
       
        public BookEventController(BookReadingContext context,SignInManager<ApplicationUser> signInManager, IBookEventRepository bookEvent)
        {
            _context = context;
            _signInManager = signInManager;
            _bookEvent = bookEvent;
          
            
        }

        // GET: BookEvent
        [HttpGet]
        [Authorize(Roles = "User,Admin")]
        public IActionResult Index()
        {

            return View(_bookEvent.BookList());
        }

        // GET: BookEvent/Details/5
        [HttpGet]
        public IActionResult Details(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var bookEventModel = _bookEvent.BookDetails(id);
            if (bookEventModel == null)
            {
                return NotFound();
            }
            return View(bookEventModel);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]

        [Authorize(Roles = "User,Admin")]
        public IActionResult Comments(string id,[Bind("Name,Comment,Title")] CommentModel commentModel)
        {

                commentModel.Name = User.FindFirst("UserFullName").Value;
                commentModel.Title = id;
            _bookEvent.BookComments(commentModel);
            return RedirectToAction( "Details", "BookEvent", new {id = id }); 
        }

        [Authorize(Roles = "User,Admin")]
        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "User,Admin")]
        public  IActionResult Create([Bind("Email,Title,Date,Location,StartTime,Type,Duration,Description,OtherDetails,InviteByEmail")] BookEventModel bookEventModel)
        {
            if (ModelState.IsValid)
            {
                if (_bookEvent.FindBook(bookEventModel))
                {
                    ViewBag.Duplicate = "This event already present";
                }
                else
                {
                    bookEventModel.Email = User.FindFirst("UserEmail").Value;
                    _bookEvent.CreateBook(bookEventModel);
                    return RedirectToAction(nameof(Index));
                }
            }
            return View(bookEventModel);
        }

        // GET: BookEvent/Edit/5
        [HttpGet]
        [Authorize(Roles = "User,Admin")]
        public IActionResult Edit(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var bookEventModel = _bookEvent.FindBook(id);
            if (bookEventModel == null)
            {
                return NotFound();
            }
            return View(bookEventModel);
        }

        // POST: BookEvent/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "User,Admin")]
        public IActionResult Edit(string id, [Bind("Email,Title,Date,Location,StartTime,Type,Duration,Description,OtherDetails,InviteByEmail")] BookEventModel bookEventModel)
        {
            if (id != bookEventModel.Title)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {

                    _bookEvent.UpdateBook(bookEventModel);
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!BookEventModelExists(bookEventModel.Title))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(bookEventModel);
        }

        // GET: BookEvent/Delete/5
        [HttpGet]
        [Authorize(Roles = "User,Admin")]
        public IActionResult Delete(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var bookEventModel = _bookEvent.BookDetails(id);
            if (bookEventModel == null)
            {
                return NotFound();
            }

            return View(bookEventModel);
        }

        // POST: BookEvent/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "User,Admin")]
        public IActionResult DeleteConfirmed(string id)
        {
            var bookEventModel = _bookEvent.FindBook(id);
            _bookEvent.DeleteBook(bookEventModel);
            return RedirectToAction(nameof(Index));
        }

        private bool BookEventModelExists(string id)
        {
            return _context.BookEvents.Any(e => e.Title == id);
        }
    }
}
