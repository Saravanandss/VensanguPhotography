using NUnit.Framework;
using VensanguPhotography.ImageApi.Controllers;
using VensanguPhotography.ImageApi.Helpers;

namespace VensanguPhotography.ImageApi.UnitTest
{
    [TestFixture]
    public class ImageControllerTest
    {
        [Test]
        public void TestPortraits()
        {
            //Arrange
            var imageHelper = new MockImageHelper();
            var controller = new ImagesController(imageHelper);
            
            //Act
            var portraits = controller.Get("portrait");
            
            //Assert
            Assert.AreEqual(1, portraits.Portraits.Length);
            Assert.AreEqual(3, portraits.Landscapes.Length);
        }
    }

    public class MockImageHelper : IImageHelper
    {
        public bool DirectoryExists(string path)
        {
            switch (path)
            {
                case "portfolio":
                case "portrait":
                case "party":
                case "family":
                    return true;
                default:
                    return false;
            }
        }

        public string[] GetAllFiles(string path)
        {
            switch (path)
            {
                case "portfolio":
                    return new[] {"Portfolio 1 P", "Portfolio 2 L", "Portfolio 3 P"};
                case "portrait":
                    return new[] { "portrait 1 L", "portrait 2 P", "portrait 3 P", "portrait 4 P" };
                case "party":
                    return new[] { "party 1 L", "party 2 L" };
                case "family":
                    return new[] { "family 1 L", "family 2 P", "family 3 P", "family 1 L", "family 2 P", "family 3 P" };
                default:
                    break;
            }

            return null;
        }

        public bool IsPortrait(string path) => path.EndsWith("P");
    }
}
