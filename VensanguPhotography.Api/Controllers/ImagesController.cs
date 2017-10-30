using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.IO;
using System.Web.Hosting;
using VensanguPhotography.Api.Models;

namespace VensanguPhotography.Api.Controllers
{
    public class ImagesController : ApiController
    {
        public ImagesModel Get(string type)
        {
            return GetImageNames(type);
        }

        private ImagesModel GetImageNames(string imageType)
        {
           // var path = HostingEnvironment.MapPath($@"~\Content\Images\{imageType}");
            var imagesModel = new ImagesModel
            {
                Landscapes = Directory.GetFiles($@"~\Content\Images\{imageType}\landscape", "*.jpg"),
                Portraits = Directory.GetFiles($@"~\Content\Images\{imageType}\portrait", "*.jpg")
            };
            
            return imagesModel;
        }
    }
}
