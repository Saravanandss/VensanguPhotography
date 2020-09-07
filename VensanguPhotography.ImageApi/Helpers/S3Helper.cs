using Amazon.Extensions.NETCore.Setup;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using VensanguPhotography.Core;
using VensanguPhotography.ImageApi.Models;

namespace VensanguPhotography.ImageApi.Helpers
{
    public class S3Helper : IS3Helper
    {
        private readonly AWSOptions awsOptions;
        private readonly IConfiguration configuration;
        private readonly string ImageMetadataFile;
        private readonly string METADATAFILE = "MetaFileName";
        private const string BUCKETNAME = "BucketName";

        public S3Helper(IConfiguration configuration)
        {
            this.awsOptions = configuration.GetAWSOptions();
            this.configuration = configuration;
            this.ImageMetadataFile = configuration[METADATAFILE];
        }

        public async Task<IEnumerable<Image>> GetImages()
        {
            if (!IsValidBucketName()) return null;

            Console.WriteLine("Bucket Name: " +  configuration[BUCKETNAME]);

            var s3 = new AwsS3(configuration[BUCKETNAME], awsOptions);
            var s3Objects = await s3.GetObjectsList();

            if (s3Objects == null) return null;

            var images = new List<Image>();
            foreach (var s3Object in s3Objects)
            {
                if(s3Object.Key.EndsWith(".json")) continue;

                var tags = await s3.GetObjectTags(s3Object);

                images.Add(new Image
                {
                    Name = s3Object.Key,
                    Orientation = tags?.GetOrientation() ?? Orientation.Unknown,
                    Category = tags?.GetImageCategory() ?? Category.Portfolio
                });
            }
            return images;
        }

        public async Task<IEnumerable<Image>> GetImages(Category category)
        {   
            var images = await GetImages();
            return images?.Where(image => image.Category == category);
        }

        public async Task<Metadata> ReadMetadata()
        {
            if (!IsValidBucketName()) return null;

            var s3 = new AwsS3(configuration[BUCKETNAME], awsOptions);
            var getMetadataStream = await s3.ReadObject(ImageMetadataFile);

            using var stringReader = new StreamReader(getMetadataStream);
            return JsonSerializer.Deserialize<Metadata>(stringReader.ReadToEnd());
        }

        public async void UpdateMetadata(Metadata metadata)
        {
            if (!IsValidBucketName()) return;

            var metadataJson = JsonSerializer.Serialize(metadata);
            using var inputStream = new MemoryStream(2048);
            using var writer = new StreamWriter(inputStream);
            await writer.WriteAsync(metadataJson);
            await writer.FlushAsync();

            var s3 = new AwsS3(configuration[BUCKETNAME], awsOptions);
            await s3.WriteObject(ImageMetadataFile, inputStream);
        }

        public bool IsValidBucketName() => string.IsNullOrEmpty(configuration[BUCKETNAME]) ? false : true;
    }
}