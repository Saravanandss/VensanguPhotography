using System.Collections.Generic;
using Amazon.S3.Model;
using System.Linq;
using VensanguPhotography.ImageApi.Models;
using System;

namespace VensanguPhotography.ImageApi.Helpers
{
    public static class Extensions
    {
        public static Orientation GetOrientation(this IEnumerable<Tag> tags)
        {                
            Enum.TryParse(typeof(Orientation), 
                tags.FirstOrDefault(t => t.Key.ToLower().Equals("orientation")).Value,
                out var value);
            return (Orientation) (value ?? 0);
        }
        
        public static Category GetImageCategory(this IEnumerable<Tag> tags)
        {                
            Enum.TryParse(typeof(Category), 
                tags.FirstOrDefault(t => t.Key.ToLower().Equals("category")).Value,
                out var value);
            return (Category) (value ?? 0);
        }
    }
}