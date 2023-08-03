import * as cdk from 'aws-cdk-lib';
import {Template} from 'aws-cdk-lib/assertions';
import {LambdaStack} from "../lib/Lambda-ec2-tag-info";

test('Stack should have 1 lambda', () => {
    const app = new cdk.App();
    const stack = new LambdaStack(app, 'test-stack');

    const template = Template.fromStack(stack);

    template.resourceCountIs('AWS::Lambda::Function', 1)
});

test('Stack should have Lambda Function called Ec2TagInfo, Runtime: nodejs14.x and Handler: index.handler', () => {
    const app = new cdk.App();
    const stack = new LambdaStack(app, 'test-stack');

    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::Lambda::Function' ,{
      Handler: 'index.handler',
      Runtime: 'nodejs14.x',
      FunctionName: 'Ec2TagInfo'
    })
})

test('Stack should have access to Describe EC2 Instance policy attached to the Lambda Function', () => {
    const app = new cdk.App();
    const stack = new LambdaStack(app, 'test-stack');

    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: {
        Statement: [
          {
            Action: 'ec2:DescribeInstances',
            Effect: 'Allow',
            Resource: '*',
          },
        ],
        Version: '2012-10-17',
      },
    })
});