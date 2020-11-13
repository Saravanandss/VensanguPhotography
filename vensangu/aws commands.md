#AWS commands

##Sync vensangu-web code
aws s3 sync ~/Programming/VensanguPhotography/vensangu/dist/vensangu s3://www.vensangu.com

##Move an image to S3
aws s3 cp filename.jpg s3://vensangu-images

##Set tag value to s3 object
aws s3api put-object-tagging --bucket vensangu-images --key filename.jpg --tagging '{"TagSet":[{"Key":"Category", "Value": "Portrait"},{"Key":"Orientation", "Value": "Portrait"}]}'