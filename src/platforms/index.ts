import activeCampaign from '@/platforms/active-campaign';
import aircall from '@/platforms/aircall';
import apollo from '@/platforms/apollo';
import dialpad from '@/platforms/dialpad';
import hubspot from '@/platforms/hubspot';
import mailchimp from '@/platforms/mailchimp';
import monday from '@/platforms/monday';
import outreach from '@/platforms/outreach';
import pipedrive from '@/platforms/pipedrive';
import ringcentral from '@/platforms/ringcentral';
import salesforce from '@/platforms/salesforce';
import salesloft from '@/platforms/salesloft';
import slack from '@/platforms/slack';
import teams from '@/platforms/teams';
import { Platform } from '@/sdk';
import affinity from './affinity';
import close from './close';
import customerIo from './customer.io';
import dynamicsSales from './dynamics-sales';
import freshdesk from './freshdesk';
import freshsales from './freshsales';
import intercom from './intercom';
import shopify from './shopify';
import woocommerce from './woocommerce';
import zendesk from './zendesk';

export {
  default as activeCampaign,
  types as activeCampaignType,
} from '@/platforms/active-campaign';
export { default as aircall, types as aircallTypes } from '@/platforms/aircall';
export { default as apollo, types as apolloTypes } from '@/platforms/apollo';
export { default as dialpad, types as dialpadTypes } from '@/platforms/dialpad';
export { default as hubspot, types as hubspotTypes } from '@/platforms/hubspot';
export {
  default as mailchimp,
  types as mailchimpTypes,
} from '@/platforms/mailchimp';
export { default as monday, types as mondayTypes } from '@/platforms/monday';
export {
  default as outreach,
  types as outreachTypes,
} from '@/platforms/outreach';
export {
  default as pipedrive,
  types as pipedriveTypes,
} from '@/platforms/pipedrive';
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
export { default as teams, types as teamsTypes } from '@/platforms/teams';
export { default as affinity } from './affinity';
export { default as close } from './close';
export { default as customerIo } from './customer.io';
export { default as dynamicsSales } from './dynamics-sales';
export { default as freshdesk } from './freshdesk';
export { default as freshsales } from './freshsales';
export { default as intercom } from './intercom';
export { default as zendesk } from './zendesk';
export { default as zoho } from './zoho';

export const integrationsList: Platform<any, any, any, any, any, any>[] = [
  activeCampaign,
  affinity,
  aircall,
  apollo,
  customerIo,
  dialpad,
  freshdesk,
  freshsales,
  hubspot,
  mailchimp,
  monday,
  outreach,
  pipedrive,
  ringcentral,
  salesforce,
  salesloft,
  slack,
  teams,
  shopify,
  woocommerce,
  intercom,
  zendesk,
  zoho,
  close,
  dynamicsSales,
];
