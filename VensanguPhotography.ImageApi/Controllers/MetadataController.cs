using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using VensanguPhotography.ImageApi.Helpers;
using VensanguPhotography.ImageApi.Models;

namespace VensanguPhotography.ImageApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MetadataController : ControllerBase
    {
        private readonly IS3Helper s3Helper;

        public MetadataController(IS3Helper s3Helper)
        {
            this.s3Helper = s3Helper;
        }

        [HttpPost]
        public void UpdateMetadata()
        {
            try
            {
                var metadata = new Metadata
                {
                    Images = s3Helper.GetImages().Result
                };

                s3Helper.UpdateMetadata(metadata);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error while pdating metadata" + ex.Message);
            }
        }

        [HttpGet]
        public async Task<Metadata> GetMetadata() => await s3Helper.ReadMetadata();

        public JsonResult ToJson(Metadata metadata)
        {
            return new JsonResult(metadata);
        }
    }
}