using NUnit.Framework;
using VensanguPhotography.ImageApi.Controllers;
using VensanguPhotography.ImageApi.Helpers;

namespace VensanguPhotography.ImageApi.UnitTest
{
    [TestFixture]
    public class ImageControllerTest
    {
        public bool IsPortrait(string path) => path.EndsWith("P");
    }
}
