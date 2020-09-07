using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using VensanguPhotography.ImageApi.Helpers;
using VensanguPhotography.ImageApi.Models;

namespace VensanguPhotography.ImageApi.UnitTest
{
    public class S3HelperMock : IS3Helper
    {
        private List<Image> images = new List<Image>
        {
            new Image {Name="Image1.jpg", Category = Category.Portfolio,Orientation = Orientation.Landscape },
            new Image {Name="Image2.jpg", Category = Category.Family,Orientation = Orientation.Landscape },
            new Image {Name="Image3.jpg", Category = Category.Outdoor,Orientation = Orientation.Portrait },
            new Image {Name="Image4.jpg", Category = Category.Portfolio,Orientation = Orientation.Landscape },
            new Image {Name="Image5.jpg", Category = Category.Portrait,Orientation = Orientation.Portrait },
        };

        public Task<IEnumerable<Image>> GetImages() => Task.Run(() => images.AsEnumerable());

        public Task<IEnumerable<Image>> GetImages(Category category) => Task.Run(() => images.Where(i => i.Category == category));

        public Task<Metadata> ReadMetadata() => Task.Run(() => new Metadata{Images = images});

        public void UpdateMetadata(Metadata metadata)
        {
            return;
        }
    }
}