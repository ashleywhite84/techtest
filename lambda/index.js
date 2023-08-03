"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_sdk_1 = require("aws-sdk");
async function handler() {
    var _a;
    const ec2 = new aws_sdk_1.EC2();
    try {
        const response = await ec2.describeInstances().promise();
        const instances = ((_a = response.Reservations) === null || _a === void 0 ? void 0 : _a.reduce((acc, reservation) => {
            if (reservation.Instances) {
                acc.push(...reservation.Instances);
            }
            return acc;
        }, [])) || [];
        const ec2Info = instances.map((instance) => {
            var _a, _b;
            return ({
                InstanceId: instance.InstanceId,
                Name: ((_b = (_a = instance.Tags) === null || _a === void 0 ? void 0 : _a.find((tag) => tag.Key === 'Name')) === null || _b === void 0 ? void 0 : _b.Value) || 'N/A',
                Tags: instance.Tags || [],
            });
        });
        return ec2Info;
    }
    catch (error) {
        console.error('Error fetching EC2 instances:', error);
        throw error;
    }
}
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBOEI7QUFFdkIsS0FBSyxVQUFVLE9BQU87O0lBQzNCLE1BQU0sR0FBRyxHQUFHLElBQUksYUFBRyxFQUFFLENBQUM7SUFFdEIsSUFBSTtRQUNGLE1BQU0sUUFBUSxHQUFHLE1BQU0sR0FBRyxDQUFDLGlCQUFpQixFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDekQsTUFBTSxTQUFTLEdBQUcsT0FBQSxRQUFRLENBQUMsWUFBWSwwQ0FBRSxNQUFNLENBQUMsQ0FBQyxHQUFtQixFQUFFLFdBQVcsRUFBRSxFQUFFO1lBQ25GLElBQUksV0FBVyxDQUFDLFNBQVMsRUFBRTtnQkFDekIsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUNwQztZQUNELE9BQU8sR0FBRyxDQUFDO1FBQ2IsQ0FBQyxFQUFFLEVBQUUsTUFBSyxFQUFFLENBQUM7UUFFYixNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7O1lBQUMsT0FBQSxDQUFDO2dCQUMzQyxVQUFVLEVBQUUsUUFBUSxDQUFDLFVBQVU7Z0JBQy9CLElBQUksRUFBRSxhQUFBLFFBQVEsQ0FBQyxJQUFJLDBDQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxNQUFNLDJDQUFHLEtBQUssS0FBSSxLQUFLO2dCQUN0RSxJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUksSUFBSSxFQUFFO2FBQzFCLENBQUMsQ0FBQTtTQUFBLENBQUMsQ0FBQztRQUVKLE9BQU8sT0FBTyxDQUFDO0tBQ2hCO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLCtCQUErQixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3RELE1BQU0sS0FBSyxDQUFDO0tBQ2I7QUFDSCxDQUFDO0FBdkJELDBCQXVCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVDMiB9IGZyb20gJ2F3cy1zZGsnO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIoKTogUHJvbWlzZTxhbnk+IHtcclxuICBjb25zdCBlYzIgPSBuZXcgRUMyKCk7XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGVjMi5kZXNjcmliZUluc3RhbmNlcygpLnByb21pc2UoKTtcclxuICAgIGNvbnN0IGluc3RhbmNlcyA9IHJlc3BvbnNlLlJlc2VydmF0aW9ucz8ucmVkdWNlKChhY2M6IEVDMi5JbnN0YW5jZVtdLCByZXNlcnZhdGlvbikgPT4ge1xyXG4gICAgICBpZiAocmVzZXJ2YXRpb24uSW5zdGFuY2VzKSB7XHJcbiAgICAgICAgYWNjLnB1c2goLi4ucmVzZXJ2YXRpb24uSW5zdGFuY2VzKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gYWNjO1xyXG4gICAgfSwgW10pIHx8IFtdO1xyXG5cclxuICAgIGNvbnN0IGVjMkluZm8gPSBpbnN0YW5jZXMubWFwKChpbnN0YW5jZSkgPT4gKHtcclxuICAgICAgSW5zdGFuY2VJZDogaW5zdGFuY2UuSW5zdGFuY2VJZCxcclxuICAgICAgTmFtZTogaW5zdGFuY2UuVGFncz8uZmluZCgodGFnKSA9PiB0YWcuS2V5ID09PSAnTmFtZScpPy5WYWx1ZSB8fCAnTi9BJyxcclxuICAgICAgVGFnczogaW5zdGFuY2UuVGFncyB8fCBbXSxcclxuICAgIH0pKTtcclxuXHJcbiAgICByZXR1cm4gZWMySW5mbztcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgRUMyIGluc3RhbmNlczonLCBlcnJvcik7XHJcbiAgICB0aHJvdyBlcnJvcjtcclxuICB9XHJcbn1cclxuIl19