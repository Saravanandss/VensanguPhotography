using System;
using System.Collections.Generic;

namespace VensanguPhotography.ImageApi.Helpers
{
    public class S3Helpers
    {
        private readonly Uri _cloudFrontUri;
        public S3Helpers(Uri cloudFrontUri)
        {
            _cloudFrontUri = cloudFrontUri;
        }

        public static IEnumerable<string> GetImagesOfType(string type)
        {
            //HttpClient

            //var jsonSerializer = new JavaScriptSerializer();
            return new List<string>();
        }
    }
}