using BookReading.Data;
using BookReading.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookReading.Controllers
{

    [Authorize(Roles ="Admin")]
    public class AdminPanelController : Controller
    {
        private readonly BookReadingContext _context;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AdminPanelController(BookReadingContext context, SignInManager<ApplicationUser> signInManager)
        {
            _context = context;
            _signInManager = signInManager;

        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            return View(await _context.BookEvents.OrderByDescending(m => m.Date).ToListAsync());
        }
    }
}
