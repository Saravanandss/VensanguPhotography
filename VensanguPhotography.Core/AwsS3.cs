using Amazon.Extensions.NETCore.Setup;
using Amazon.S3;
using Amazon.S3.Model;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace VensanguPhotography.Core
{
    public class AwsS3
    {
        private readonly AWSOptions awsOptions;
        private readonly string bucketName;

        public AwsS3(string bucketName, AWSOptions awsOptions)
        {
            this.bucketName = bucketName;
            this.awsOptions = awsOptions;            
        }

        public async Task<IEnumerable<S3Object>> GetObjectsList()
        {
            using var s3Client = awsOptions.CreateServiceClient<IAmazonS3>();
            var listObjectsResponse = await s3Client.ListObjectsAsync(new ListObjectsRequest
            {
                BucketName = bucketName
            });

            return listObjectsResponse.S3Objects;
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

        public async Task<Stream> ReadObject(string objectKey)
        {
            using var s3Client = awsOptions.CreateServiceClient<IAmazonS3>();
            var getObjectResponse = await s3Client.GetObjectAsync(new GetObjectRequest
            {
                BucketName = bucketName,
                Key = objectKey
            });

            return getObjectResponse.ResponseStream;
        }

        public async Task WriteObject(string objectKey, Stream inputStream)
        {
            using var s3Client = awsOptions.CreateServiceClient<IAmazonS3>();
            await s3Client.PutObjectAsync(new PutObjectRequest
            {
                BucketName = bucketName,
                Key = objectKey,
                InputStream = inputStream
            });
        }
    }
}
