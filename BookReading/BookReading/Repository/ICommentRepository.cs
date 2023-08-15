using BookReading.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookReading.Repository
{
    public interface ICommentRepository
    {
        Task<List<CommentModel>> ShowCommentAsync();
    }
}