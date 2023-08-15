using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookReading.Models
{
    public class BookEventModel
    {
        [Display(Name = "Create by")]
        public string Email { get; set; }

        [Required]
        [RegularExpression("[A-Za-z ]{1,233}")]
        [Key]
        public string Title { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime Date { get; set; }

        [Required]
        public string Location { get; set; }

        [DataType(DataType.Time)]
        [Display(Name = "Start Time")]
        [Required]
        public DateTime StartTime { get; set; }

        [Required]
        [DefaultValue(EType.Public)]
        public EType Type { get; set; }

        [Display(Name = "Duration in hours")]
        [Range(1,4)]
        public int? Duration { get; set; }

        [StringLength(50, MinimumLength = 5)]
        public string Description { get; set; }

        [Display(Name = "Other Details")]
        [StringLength(500,MinimumLength =5)]
        public string OtherDetails { get; set; }

        [Display(Name ="Invite by email")]
        public string InviteByEmail { get; set; }

    }

    public enum EType
    {
        Public = 0,
        Private = 1
    }
}
