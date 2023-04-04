import aircall from '@/platforms/aircall';
import apollo from '@/platforms/apollo';
import dialpad from '@/platforms/dialpad';
import outreach from '@/platforms/outreach';
import ringcentral from '@/platforms/ringcentral';
import salesforce from '@/platforms/salesforce';
import salesloft from '@/platforms/salesloft';
import slack from '@/platforms/slack';
import { Platform } from '@/sdk';

export { default as aircall, types as aircallTypes } from '@/platforms/aircall';
export { default as apollo, types as apolloTypes } from '@/platforms/apollo';
export { default as dialpad, types as dialpadTypes } from '@/platforms/dialpad';
export {
  default as outreach,
  types as outreachTypes,
} from '@/platforms/outreach';
export {
  default as ringcentral,
  types as ringcentralTypes,
} from '@/platforms/ringcentral';
export {
  default as salesforce,
  types as salesforceTypes,
} from '@/platforms/salesforce';
export {
  default as salesloft,
  types as salesloftTypes,
} from '@/platforms/salesloft';
export { default as slack, types as slackTypes } from '@/platforms/slack';

export const integrationsList: Platform<any, any, any, any, any>[] = [
  aircall,
  apollo,
  dialpad,
  outreach,
  ringcentral,
  salesforce,
  salesloft,
  slack,
];
