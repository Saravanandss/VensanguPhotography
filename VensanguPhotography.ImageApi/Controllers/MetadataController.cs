using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Mvc;

namespace VensanguPhotography.ImageApi.Controllers
{
    [Route("/metaupdate")]
    public class MetadataController : Controller
    {
        private readonly IAmazonS3 _s3Client;
        private readonly ListObjectsRequest _listObjectsRequest;
        public MetadataController(IAmazonS3 s3Client, ListObjectsRequest listObjectsRequest)
        {
            this._listObjectsRequest = listObjectsRequest;
            _s3Client = s3Client;
        }

        [HttpGet]
        public void UpdateMetadata()
        {
            var objectList = _s3Client.ListObjectsAsync(_listObjectsRequest);
        }
    }
}