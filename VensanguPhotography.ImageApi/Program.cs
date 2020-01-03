using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.Core;
using Amazon.Lambda.RuntimeSupport;
using Amazon.Lambda.Serialization.Json;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using System;
using System.Threading.Tasks;

namespace VensanguPhotography.ImageApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            if (string.IsNullOrEmpty(Environment.GetEnvironmentVariable("AWS_LAMBDA_FUNCTION_NAME")))
            {
                CreateHostBuilder(args).Build().Run();
            }
            else
            {
                var lambdaEntryPoint = new LambdaEntryPoint();
                var functionHandler = (Func<APIGatewayProxyRequest, ILambdaContext, Task<APIGatewayProxyResponse>>)lambdaEntryPoint.FunctionHandlerAsync;
                using var handlerWrapper = HandlerWrapper.GetHandlerWrapper(functionHandler, new JsonSerializer());
                using var bootstrap = new LambdaBootstrap(handlerWrapper);
                bootstrap.RunAsync().Wait();
            }
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
