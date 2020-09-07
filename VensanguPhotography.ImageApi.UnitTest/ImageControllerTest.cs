using System;
using Microsoft.Extensions.DependencyInjection;
using VensanguPhotography.ImageApi.Helpers;
using Xunit;

namespace VensanguPhotography.ImageApi.UnitTest
{
    public class ImageControllerTest
    {
        public ImageControllerTest()
        {
            var services = new ServiceCollection();
            services.AddTransient<IS3Helper, S3HelperMock>();
        }

        [Fact]
        public void TestImageControllerGet()
        {

        }
    }
}
