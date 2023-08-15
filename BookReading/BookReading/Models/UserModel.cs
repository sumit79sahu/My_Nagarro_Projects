using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookReading.Models
{
    public class UserModel
    {
        [Required(ErrorMessage = "Please Valid Enter Name")]
        [Display(Name ="Full Name")]
        [RegularExpression(@"[A-Za-z ]{1,255}", ErrorMessage = "Please Valid Enter Name")]
        public string FullName { get; set; }

        [Required(ErrorMessage ="Please enter your email ")]
        [Display(Name ="Email address")]
        [EmailAddress(ErrorMessage ="Please Enter Valid email")]
        [RegularExpression(@"^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$", ErrorMessage = "Please Enter Valid email")]
        [Key]
        public string Email { get; set; }

        [Required(ErrorMessage ="Please enter a strong password")]
        [Display(Name = "Password")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required(ErrorMessage = "Please confirm your password")]
        [Compare("Password",ErrorMessage ="Confirm Password does not match")]
        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        public string ConfirmPassword { get; set; }
    }
}
