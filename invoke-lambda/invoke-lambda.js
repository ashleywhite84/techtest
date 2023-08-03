const AWS = require('aws-sdk');
const util = require('util');

async function invokeLambdaFunction() {

  AWS.config.update({ region: 'eu-west-1' });

  const lambda = new AWS.Lambda();

  const functionName = 'Ec2TagInfo';

  try {
    const lambda = new AWS.Lambda();

    const params = {
      FunctionName: functionName,
      InvocationType: 'RequestResponse', 
      Payload: JSON.stringify({}), 
    };

    const response = await lambda.invoke(params).promise();
    const payload = JSON.parse(response.Payload);

    console.log('Lambda Response:', payload);
    console.log(util.inspect(payload, { depth: null }));

    return payload;
  } catch (error) {
    console.error('Error invoking Lambda function:', error);
    throw error;
  }
}

invokeLambdaFunction();