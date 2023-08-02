import { EC2 } from 'aws-sdk';
import { flatMap } from 'lodash';
import * as util from 'util';

export async function handler(): Promise<any> {
  const ec2 = new EC2();

  try {
    const response = await ec2.describeInstances().promise();
    const instances = flatMap(response.Reservations, (reservation) => reservation.Instances || []);

    const ec2Info = instances.map((instance) => ({
      InstanceId: instance.InstanceId,
      Name: instance.Tags?.find((tag) => tag.Key === 'Name')?.Value || 'N/A',
      Tags: instance.Tags?.map((tag) => ({ [tag.Key]: tag.Value })) || [],
    }));

    console.log('EC2 Instance Info:');
    ec2Info.forEach((instance) => {
      console.log(`InstanceId: ${instance.InstanceId}`);
      console.log(`Name: ${instance.Name}`);
      console.log('Tags:');
      console.log(instance.Tags);
      console.log('--------------------');
  });

    return ec2Info;
  } catch (error) {
    console.error('Error fetching EC2 instances:', error);
    throw error;
  }
}

function stringifyTags(tags: EC2.TagList | undefined): string {
  if (!tags) {
    return '';
  }
  return JSON.stringify(tags.map((tag) => ({ [tag.Key!]: tag.Value! })), null, 2);
}