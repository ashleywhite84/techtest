#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import {SurecloudCdkScenarioPrerequisiteStack} from '../lib/surecloud-cdk-scenario-prerequisite-stack';
import { LambdaStack } from '../lib/Lambda-ec2-tag-info';

const app = new cdk.App();
new SurecloudCdkScenarioPrerequisiteStack(app, 'surecloud-cdk-scenario-prerequisite-stack');
new LambdaStack(app, 'Ec2TagInfo');
