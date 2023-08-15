using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace BAL.Models
{
    public class CampModel
    {

        [Required]
        public int Camp_id { get; set; }
        [Required]
        public string Camp_name { get; set; } = string.Empty;
        [Required]
        public int Capacity { get; set; }
        [Required]
        public string Description { get; set; }= string.Empty;
        [Required]
        public string Camp_img { get; set; } = string.Empty;
        [Required]
        public double Camp_price { get; set; }
        [Required]
        public DateTime Camp_avaliable_date { get; set; }
      
 
        [Required]
        //[DefaultValue(true)]
        public Boolean Booked { get; set; }

    }
}
