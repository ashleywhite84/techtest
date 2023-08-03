#!/bin/bash

# Install dependencies
echo Installing Dependencies
npm install

# Bootstrap the AWS environment
echo Bootstraping the AWS environment
cdk bootstrap

# Run test cases for CDK
echo running npm test
npm test

# Deploy all the CDK stack
echo Deployment of all the stacks
cdk deploy --all --require-approval=never


# Get EC2 information 
echo getting ec2 Name and tags
node invoke-lambda/invoke-lambda.js
