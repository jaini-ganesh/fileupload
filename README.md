# React JS File Upload Using AWS Pre-Signed URL

This project demonstrates how to upload files from a React JS application to an AWS S3 bucket using pre-signed URLs. A pre-signed URL allows you to upload a specific object to your S3 bucket without requiring AWS credentials or permissions.

## Prerequisites

- Node.js installed on your machine
- AWS account with S3 bucket setup
- Basic knowledge of React and AWS S3

## Getting Started

Follow these steps to set up the project and upload files to S3 using pre-signed URLs.

### Step 1: Setting Up the Backend (AWS Lambda)

1. **Create an S3 bucket in AWS**:
   - Sign in to the AWS Management Console.
   - Go to the S3 service.
   - Create a new bucket or use an existing one.

2. **Create a Lambda function to generate pre-signed URLs**:
   - Go to the AWS Lambda service.
   - Create a new Lambda function.
   - Use the following code for the Lambda function:
     ```javascript
     const AWS = require('aws-sdk');
     const S3 = new AWS.S3();
     const BUCKET_NAME = 'your-bucket-name';

     exports.handler = async (event) => {
         const fileName = event.queryStringParameters.name;
         const fileType = event.queryStringParameters.type;

         const s3Params = {
             Bucket: BUCKET_NAME,
             Key: fileName,
             Expires: 60, // URL expiration time in seconds
             ContentType: fileType,
             ACL: 'public-read'
         };

         try {
             const uploadURL = await S3.getSignedUrlPromise('putObject', s3Params);
             return {
                 statusCode: 200,
                 headers: {
                     "Access-Control-Allow-Origin": "*"
                 },
                 body: JSON.stringify({ uploadURL }),
             };
         } catch (error) {
             return {
                 statusCode: 500,
                 headers: {
                     "Access-Control-Allow-Origin": "*"
                 },
                 body: JSON.stringify({ error: error.message }),
             };
         }
     };
     ```
   - Deploy the function and note down the API endpoint.

3. **Set up API Gateway**:
   - Create a new API in API Gateway.
   - Create a new resource and method (GET).
   - Integrate the GET method with the Lambda function.
   - Deploy the API and note down the invoke URL.

### Step 2: Setting Up the Frontend (React Application)

1. **Create a new React application**:
   ```bash
   npx create-react-app react-file-upload
   cd react-file-upload
   npm start

