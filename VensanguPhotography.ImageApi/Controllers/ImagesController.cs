using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using VensanguPhotography.ImageApi.Models;

namespace VensanguPhotography.ImageApi.Controllers
{
    [EnableCors("AllowLocalHost")]
    [Route("/")]
    public class ImagesController : Controller
    {
        [HttpGet("{type}")]
        public ImagesModel Get(string type)
        {
            var path = $@"wwwroot\Images\{type}";
            if (!Directory.Exists(path + @"\landscape") || !Directory.Exists(path + @"\portrait")) return null;

            var imagesModel = new ImagesModel
            {
                Landscapes = Directory.GetFiles(path + @"\landscape", "*.jpg")
                    .Select(p =>/* "ImageApi/" +*/ p.Replace("wwwroot\\", "").Replace('\\', '/')).ToArray(),
                Portraits = Directory.GetFiles(path + @"\portrait", "*.jpg")
                    .Select(p => /*"ImageApi/" +*/ p.Replace("wwwroot\\", "").Replace('\\', '/')).ToArray()
            };

            return imagesModel;
        }
    }
}