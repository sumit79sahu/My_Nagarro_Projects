using BookReading.Models;
using System.Collections.Generic;

namespace BookReading.Repository
{
    public interface IBookEventRepository
    {
        IList<BookEventModel> BookList();
        BookEventModel BookDetails(string id);
        void BookComments(CommentModel commentModel);
        bool FindBook(BookEventModel bookEventModel);
        BookEventModel FindBook(string id);
        void CreateBook(BookEventModel bookEventModel);
        void UpdateBook(BookEventModel bookEventModel);
        void DeleteBook(BookEventModel bookEventModel);

    }
}