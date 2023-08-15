using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BAL.Models
{
    public  class AdminModel
    {

        public string Admin_Name { get; set; } = string.Empty;

        [Required]
        public string Admin_Password { get; set;} = string.Empty;
        [Required]
        public string Admin_Email { get; set;}= string.Empty;

    }
}
