using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using VensanguPhotography.ImageApi.Helpers;

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
            var images = s3Helper.GetAllImages().Result;
            
        }
    }
}