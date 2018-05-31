using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ImageMagick;

namespace VensanguPhotography.ImageApi.Helpers
{
    public interface IImageHelper
    {
        bool DirectoryExists(string path);
        string[] GetAllFiles(string path);
        bool IsPortrait(string path);
    }

    public class ImageHelper : IImageHelper
    {
        public bool DirectoryExists(string path) => Directory.Exists(path);
        public string[] GetAllFiles(string path) => Directory.GetFiles(path);

        private IMagickImage CreateImage(string path) => new MagickImage(path);

        public bool IsPortrait(string path)
        {
            using (var image = CreateImage(path))
            {
                return image.Height > image.Width;
            }
        }
    }
}
