using BookReading.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BookReading.Data;

namespace BookReading.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly BookReadingContext _context;

        public CommentRepository(BookReadingContext context)
        {
            _context = context;
        }

        public async Task<List<CommentModel>> ShowCommentAsync()
        {
            var result = await _context.Comments.ToListAsync();
            return result;
        }
    }
}
