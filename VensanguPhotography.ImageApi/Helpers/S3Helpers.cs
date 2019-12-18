using System.Collections.Generic;
using System.Threading.Tasks;
using Amazon.Extensions.NETCore.Setup;
using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.Extensions.Configuration;
using static VensanguPhotography.ImageApi.Models.Metadata;

namespace VensanguPhotography.ImageApi.Helpers
{
    public class S3Helpers
    {
        private readonly AWSOptions awsOptions;
        private readonly string bucketName;

        public S3Helpers(IConfiguration configuration)
        {
            this.awsOptions = configuration.GetAWSOptions();
            bucketName = configuration["BucketName"];
        }

        public async Task<IEnumerable<Image>> GetAllImages()
        {
            using var s3Client = awsOptions.CreateServiceClient<IAmazonS3>();
            var s3Objects = await s3Client.ListObjectsAsync(new ListObjectsRequest{
                BucketName = bucketName
            });

            if(s3Objects == null) return null;

            var images = new List<Image>();
            foreach(var s3Object in s3Objects.S3Objects)
            {
                var tags = await GetObjectTags(s3Object);
                images.Add(new Image
                {
                    Name = s3Object.Key,
                    Orientation = tags.GetOrientation(),
                    Category = tags.GetImageCategory()
                });
            }
            return images;
        }

        public async Task<IEnumerable<Tag>> GetObjectTags(S3Object s3Object)
        {
            using var s3Client = awsOptions.CreateServiceClient<IAmazonS3>();
            var response = await s3Client.GetObjectTaggingAsync(
                new GetObjectTaggingRequest
                {
                    BucketName = bucketName,
                    Key = s3Object.Key  
                });
            return response.Tagging;
        }
    }
}