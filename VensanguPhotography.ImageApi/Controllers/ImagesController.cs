using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VensanguPhotography.ImageApi.Helpers;
using VensanguPhotography.ImageApi.Models;

namespace VensanguPhotography.ImageApi.Controllers
{
    [EnableCors("AllowLocalHost")]
    [Route("/images")]
    public class ImagesController : Controller
    {
        private readonly IS3Helper s3Helper;
        private readonly IConfiguration configuration;
        private readonly IImageHelper imageHelper;

        
        public ImagesController(IImageHelper imageHelper, IS3Helper s3Helper, IConfiguration configuration)
        {
            this.imageHelper = imageHelper;
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

            
            //var path = $@"wwwroot\Images\{category}";
            //if (!imageHelper.DirectoryExists(path)) return null;

            //var fileNames = imageHelper.GetAllFiles(path);
            //var landscapeImages = new List<string>();
            //var portraitImages = new List<string>();
            //foreach (var fileName in fileNames)
            //{
            //    if (imageHelper.IsPortrait(fileName))
            //        portraitImages.Add(fileName);
            //    else
            //        landscapeImages.Add(fileName);
            //}

            //var imagesModel = new ImagesModel
            //{
            //    Landscapes = landscapeImages.Select(p => p.Replace("wwwroot\\", "").Replace('\\', '/')).ToArray(),
            //    Portraits = portraitImages.Select(p => p.Replace("wwwroot\\", "").Replace('\\', '/')).ToArray()
            //};

            //return imagesModel;
        }

        private string[] GetImageUrls(IEnumerable<Image> images, Orientation orientation) =>
            images.Where(image => image.Orientation == orientation).Select(image => $"{configuration["cloudFrontUrl"]}{image.Name}").ToArray();


    }
}