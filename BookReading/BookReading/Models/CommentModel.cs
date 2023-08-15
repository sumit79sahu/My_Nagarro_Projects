using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BookReading.Models
{
    public class CommentModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        [Required]
        public int CommentId { get; set; }

        [Display(Name="Comment")]
        public string Comment { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Title { get; set; }
    }
}
