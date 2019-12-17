using System.Collections.Generic;

namespace VensanguPhotography.ImageApi.Models
{
    public class Metadata
    {
        public IEnumerable<Image> Images { get; set; }

        public class Image
        {
            public string Name { get; set; }
            public ImageType Type { get; set; }
        }
    }

    public enum ImageType
    {
        Portfolio,
        Portrait,
        Family,
        Outdoor
    }
}