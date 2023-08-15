using System.ComponentModel.DataAnnotations;

namespace BAL.Models
{
    public class CampBookingModel
    {
        [Required]
        public int  Camp_Id { get; set; }
   
        [Required]
        public string Booking_Id { get; set; } = string.Empty;

        [Required]
        public string Billing_Address { get; set; } = string.Empty;

        [Required]
        public string  State { get; set; } = string.Empty;

        [Required]
        public string Country { get; set; } = string.Empty;

        [Required]
        public int Zipcode { get; set; }

        [Required]
        public string Cellphone { get; set; } = string.Empty;

        [Required]
        public double  Total_Amount { get; set; }
        [Required]
        public int Total_Stay { get; set;}
       

    }
}
