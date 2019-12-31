using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;
using VensanguPhotography.ImageApi.Helpers;
using VensanguPhotography.ImageApi.Models;

namespace VensanguPhotography.ImageApi.Controllers
{
    [Route("/images")]
    public class ImagesController : Controller
    {
        private readonly IS3Helper s3Helper;
        private readonly IConfiguration configuration;
        
        public ImagesController(IS3Helper s3Helper, IConfiguration configuration)
        {
            this.s3Helper = s3Helper;
            this.configuration = configuration;
        }

        [HttpGet("{category}")]
        public ImagesModel Get(Category category)
        {
            var images = s3Helper.GetImagesOfCategory(category).Result;

            return new ImagesModel
            {
                Landscapes = GetImageUrls(images, Orientation.Landscape),
                Portraits = GetImageUrls(images, Orientation.Portrait)
            };
        }

        private string[] GetImageUrls(IEnumerable<Image> images, Orientation orientation) =>
            images.Where(image => image.Orientation == orientation).Select(image => $"{configuration["cloudFrontUrl"]}{image.Name}").ToArray();
    }
}