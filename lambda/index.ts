import { EC2 } from 'aws-sdk';

export async function handler(): Promise<any> {
  const ec2 = new EC2();

  try {
    const response = await ec2.describeInstances().promise();
    const instances = response.Reservations?.reduce((acc: EC2.Instance[], reservation) => {
      if (reservation.Instances) {
        acc.push(...reservation.Instances);
      }
      return acc;
    }, []) || [];

    const ec2Info = instances.map((instance) => ({
      InstanceId: instance.InstanceId,
      Name: instance.Tags?.find((tag) => tag.Key === 'Name')?.Value || 'N/A',
      Tags: instance.Tags || [],
    }));

    return ec2Info;
  } catch (error) {
    console.error('Error fetching EC2 instances:', error);
    throw error;
  }
}
