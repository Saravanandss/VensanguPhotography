using Microsoft.AspNetCore.Mvc;
using VensanguPhotography.ImageApi.Helpers;
using VensanguPhotography.ImageApi.Models;

namespace VensanguPhotography.ImageApi.Controllers
{
    [Route("/metaupdate")]
    public class MetadataController : Controller
    {
        private readonly IS3Helper s3Helper;

        public MetadataController(IS3Helper s3Helper)
        {
            this.s3Helper = s3Helper;
        }

        [HttpGet]
        public void UpdateMetadata()
        {
            var metadata = new Metadata
            {
                Images = s3Helper.GetAllImages().Result
            };
            
            s3Helper.UpdateMetadata(metadata);
        }

        public JsonResult ToJson(Metadata metadata)
        {
            return new JsonResult(metadata);
        }
    }
}