using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace CampBookingApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        [Authorize]
        [HttpPost]
        public void UplodeImage(IFormFile image)
        {
            string filename = image.FileName;
            filename = Path.GetFileName(filename);
            string uploadPath = Path.Combine("C:\\Users\\sumitsahu\\Desktop\\MyProject\\Camp_Booking\\Client\\src\\assets\\images", filename);
            if (System.IO.File.Exists(uploadPath))
            {
                return;
            }
            else
            {
                var stream = new FileStream(uploadPath, FileMode.CreateNew);
                image.CopyToAsync(stream);
            }

        }


    }
}






