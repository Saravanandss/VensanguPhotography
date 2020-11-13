using System.Collections.Generic;

namespace VensanguPhotography.ImageApi.Models
{
    public class Metadata
    {
        public IEnumerable<Image> Images { get; set; }
    }

    public class Image
    {
        public string Name { get; set; }
        public Category Category { get; set; }
        public Orientation Orientation { get; set; }
    }

    public enum Category
    {
        All,
        Portfolio,
        Portrait,
        Family,
        Outdoor
    }

    public enum Orientation
    {
        Unknown = 0,
        Portrait = 1,
        Landscape = 2 
    }
}