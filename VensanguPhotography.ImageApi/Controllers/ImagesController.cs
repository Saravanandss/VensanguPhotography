using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using VensanguPhotography.ImageApi.Models;
using VensanguPhotography.ImageApi.Helpers;

namespace VensanguPhotography.ImageApi.Controllers
{
    [EnableCors("AllowLocalHost")]
    [Route("/")]
    public class ImagesController : Controller
    {
        public IImageHelper ImageHelper { get;  }
        
        public ImagesController(IImageHelper imageHelper)
        {
            ImageHelper = imageHelper;
        }

        [HttpGet("{type}")]
        public ImagesModel Get(string type)
        {
            var path = $@"wwwroot\Images\{type}";
            if (!ImageHelper.DirectoryExists(path)) return null;

            var fileNames = ImageHelper.GetAllFiles(path);
            var landscapeImages = new List<string>();
            var portraitImages = new List<string>();
            foreach (var fileName in fileNames)
            {
                if (ImageHelper.IsPortrait(fileName))
                    portraitImages.Add(fileName);
                else
                    landscapeImages.Add(fileName);
            }
            
            var imagesModel = new ImagesModel
            {
                Landscapes = landscapeImages.Select(p => p.Replace("wwwroot\\", "").Replace('\\', '/')).ToArray(),
                Portraits = portraitImages.Select(p => p.Replace("wwwroot\\", "").Replace('\\', '/')).ToArray()
            };

            return imagesModel;
        }
    }
}