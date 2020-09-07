using System.Collections.Generic;
using System.Threading.Tasks;
using VensanguPhotography.ImageApi.Models;

namespace VensanguPhotography.ImageApi.Helpers
{
    public interface IS3Helper
    {
        Task<IEnumerable<Image>> GetImages();
        Task<Metadata> ReadMetadata();
        void UpdateMetadata(Metadata metadata);
        Task<IEnumerable<Image>> GetImages(Category category);
    }
}