using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Amazon.Extensions.NETCore.Setup;
using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.Extensions.Configuration;
using VensanguPhotography.ImageApi.Models;
using static VensanguPhotography.ImageApi.Models.Metadata;

namespace VensanguPhotography.ImageApi.Helpers
{
    public class S3Helpers
    {
        private readonly AWSOptions awsOptions;
        private readonly IConfiguration configuration;
        private const string BUCKETNAME = "BucketName";
        private const string IMAGEMETADATA = "ImageMetadata.json";
        private const string JSONCONTENTTYPE = "application/json";
        public S3Helpers(IConfiguration configuration)
        {
            this.awsOptions = configuration.GetAWSOptions();            
            this.configuration = configuration;
        }

        public async Task<IEnumerable<Image>> GetAllImages()
        {
            using var s3Client = awsOptions.CreateServiceClient<IAmazonS3>();
            var s3Objects = await s3Client.ListObjectsAsync(new ListObjectsRequest{
                BucketName = configuration[BUCKETNAME]
            });

            if(s3Objects == null) return null;

            var images = new List<Image>();
            foreach(var s3Object in s3Objects.S3Objects)
            {
                var tags = await GetObjectTags(s3Object);
                
                images.Add(new Image
                {
                    Name = s3Object.Key,
                    Orientation = tags?.GetOrientation() ?? Orientation.Unknown,
                    Category = tags?.GetImageCategory() ??  Category.Portfolio
                });
            }
            return images;
        }

        internal Metadata ReadMetadata()
        {
            using var s3Client = awsOptions.CreateServiceClient<IAmazonS3>();
            
        }

        internal void UpdateMetadata(Metadata metadata)
        {
            var metadataJson = JsonSerializer.Serialize(metadata);

            using var s3Client = awsOptions.CreateServiceClient<IAmazonS3>();
            s3Client.PutObjectAsync(new PutObjectRequest{
                BucketName = configuration[BUCKETNAME],
                ContentType = JSONCONTENTTYPE,
                ContentBody = metadataJson,
                Key = IMAGEMETADATA
            });
        }

        public async Task<IEnumerable<Tag>> GetObjectTags(S3Object s3Object)
        {
            using var s3Client = awsOptions.CreateServiceClient<IAmazonS3>();
            var response = await s3Client.GetObjectTaggingAsync(
                new GetObjectTaggingRequest
                {
                    BucketName = configuration[BUCKETNAME],
                    Key = s3Object.Key  
                });
            return response.Tagging;
        }
    }
}