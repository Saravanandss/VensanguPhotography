using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VensanguPhotography.ImageApi.Helpers;
using VensanguPhotography.ImageApi.Models;

namespace VensanguPhotography.ImageApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IS3Helper s3Helper;
        private readonly IConfiguration configuration;

        public ImagesController(IS3Helper s3Helper, IConfiguration configuration)
        {
            this.s3Helper = s3Helper;
            this.configuration = configuration;
        }

        [HttpGet]
        [HttpGet("{category}")]
        public async Task<ImagesModel> Get(Category category)
        {
            try
            {
                var images = await s3Helper.GetImages(category);

                return new ImagesModel
                {
                    Landscapes = ComposeImageUrls(images, Orientation.Landscape) ?? new string[] { },
                    Portraits = ComposeImageUrls(images, Orientation.Portrait) ?? new string[] { }
                };
            }
            catch (Exception)
            {
                Console.WriteLine($"Error while gettting images category {category}. \n ex.Message");
            }

            return null;
        }

        private string[] ComposeImageUrls(IEnumerable<Image> images, Orientation orientation) =>
            images?.Where(image => image.Orientation == orientation).Select(image => $"{configuration["cloudFrontUrl"]}{image.Name}").ToArray();
    }
}