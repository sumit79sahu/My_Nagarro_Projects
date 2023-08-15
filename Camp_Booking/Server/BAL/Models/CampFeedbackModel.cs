
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;


namespace BAL.Models
{
    public class CampFeedbackModel
    {
        [Required]
        public int Camp_Id { get; set; }
        [Required]
        public string Booking_Id { get; set; } = string.Empty;
        [Required]
        public int Feedback_Id { get; set; }


        [Required]
        [DefaultValue(0)]
        public int Rating { get; set; }

    }
}
