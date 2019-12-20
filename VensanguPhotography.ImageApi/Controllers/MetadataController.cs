using System.Text.Json;
using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using VensanguPhotography.ImageApi.Helpers;
using VensanguPhotography.ImageApi.Models;

namespace VensanguPhotography.ImageApi.Controllers
{
    [Route("/metaupdate")]
    public class MetadataController : Controller
    {
        private readonly IAmazonS3 _s3Client;
        private readonly ListObjectsRequest _listObjectsRequest;
        private readonly IConfiguration configuration;

        public MetadataController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        [HttpGet]
        public void UpdateMetadata()
        {
            var s3Helper = new S3Helpers(configuration);

            var metadata = new Metadata
            {
                Images = s3Helper.GetAllImages().Result
            };

            var metadataJson = JsonSerializer.Serialize(metadata);
            s3Helper.UpdateMetadata(metadataJson);
        }

        public JsonResult ToJson(Metadata metadata)
        {
            return new JsonResult(metadata);
        }
    }
}