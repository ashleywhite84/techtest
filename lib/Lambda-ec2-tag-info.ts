import {Stack, StackProps, Tags, CfnOutput} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam'

export class LambdaStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
      super(scope, id, props);

      const lambdaFunction = new lambda.Function(this, 'EC2InfoLambda', {
        functionName: 'Ec2TagInfo',
        runtime: lambda.Runtime.NODEJS_14_X,
        handler: 'index.handler',
        code: lambda.Code.fromAsset('lambda'),
      });

      const ec2ReadPolicy = new iam.PolicyStatement({
        actions: ['ec2:DescribeInstances'],
        resources: ['*'],
      });

    lambdaFunction.addToRolePolicy(ec2ReadPolicy);

    new CfnOutput(this, 'LambdaFunctionARN', {
      value: lambdaFunction.functionArn,
    });
  }
}