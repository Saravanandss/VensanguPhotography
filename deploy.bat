Echo Deploying ImageApi
xcopy "d:\Saravanan\My Projects\VensanguPhotography\VensanguPhotography.ImageApi\bin\Release\PublishOutput" "C:\inetpub\wwwroot\ImageApi" /y /s

Echo Deploying Web
xcopy "d:\Saravanan\My Projects\VensanguPhotography\VensanguPhotography.Web\dist" C:\inetpub\wwwroot /y /s
