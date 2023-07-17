import activeCampaign from '@/platforms/active-campaign';
import affinity from '@/platforms/affinity';
import aircall from '@/platforms/aircall';
import apollo from '@/platforms/apollo';
import close from '@/platforms/close';
import customerIo from '@/platforms/customer.io';
import dialpad from '@/platforms/dialpad';
import dynamicsSales from '@/platforms/dynamics-sales';
import freshdesk from '@/platforms/freshdesk';
import freshsales from '@/platforms/freshsales';
import hubspot from '@/platforms/hubspot';
import intercom from '@/platforms/intercom';
import mailchimp from '@/platforms/mailchimp';
import monday from '@/platforms/monday';
import outreach from '@/platforms/outreach';
import pipedrive from '@/platforms/pipedrive';
import ringcentral from '@/platforms/ringcentral';
import salesforce from '@/platforms/salesforce';
import salesloft from '@/platforms/salesloft';
import shopify from '@/platforms/shopify';
import slack from '@/platforms/slack';
import teams from '@/platforms/teams';
import woocommerce from '@/platforms/woocommerce';
import zendesk from '@/platforms/zendesk';
import zoho from '@/platforms/zoho';
import { Platform } from '@/sdk';

export {
  default as activeCampaign,
  types as activeCampaignType,
} from '@/platforms/active-campaign';
export { default as affinity } from '@/platforms/affinity';
export { default as aircall, types as aircallTypes } from '@/platforms/aircall';
export { default as apollo, types as apolloTypes } from '@/platforms/apollo';
export { default as close } from '@/platforms/close';
export { default as customerIo } from '@/platforms/customer.io';
export { default as dialpad, types as dialpadTypes } from '@/platforms/dialpad';
export { default as dynamicsSales } from '@/platforms/dynamics-sales';
export { default as freshdesk } from '@/platforms/freshdesk';
export { default as freshsales } from '@/platforms/freshsales';
export { default as hubspot, types as hubspotTypes } from '@/platforms/hubspot';
export { default as intercom } from '@/platforms/intercom';
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
export { default as zendesk } from '@/platforms/zendesk';
export { default as zoho } from '@/platforms/zoho';

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
