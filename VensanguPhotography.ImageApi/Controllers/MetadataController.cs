using Microsoft.AspNetCore.Mvc;
using System;
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

        [HttpGet]
        public void UpdateMetadata()
        {
            try
            {
                var metadata = new Metadata
                {
                    Images = s3Helper.GetAllImages().Result
                };

                s3Helper.UpdateMetadata(metadata);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error while pdating metadata" + ex.Message);
            }          
        }

        public JsonResult ToJson(Metadata metadata)
        {
            return new JsonResult(metadata);
        }
    }
}