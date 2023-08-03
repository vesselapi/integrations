import accelo from '@/platforms/accelo';
import activeCampaign from '@/platforms/active-campaign';
import adobe from '@/platforms/adobe';
import affinity from '@/platforms/affinity';
import aircall from '@/platforms/aircall';
import airtable from '@/platforms/airtable';
import amazon from '@/platforms/amazon';
import amplitude from '@/platforms/amplitude';
import apollo from '@/platforms/apollo';
import asana from '@/platforms/asana';
import ashby from '@/platforms/ashby';
import atlassian from '@/platforms/atlassian';
import bamboohr from '@/platforms/bamboohr';
import bitbucket from '@/platforms/bitbucket';
import boldsign from '@/platforms/boldsign';
import box from '@/platforms/box';
import calendly from '@/platforms/calendly';
import clickup from '@/platforms/clickup';
import close from '@/platforms/close';
import customerIo from '@/platforms/customer.io';
import dialpad from '@/platforms/dialpad';
import dropbox from '@/platforms/dropbox';
import dynamicsSales from '@/platforms/dynamics-sales';
import factorial from '@/platforms/factorial';
import freshdesk from '@/platforms/freshdesk';
import freshsales from '@/platforms/freshsales';
import gong from '@/platforms/gong';
import hubspot from '@/platforms/hubspot';
import intercom from '@/platforms/intercom';
import mailchimp from '@/platforms/mailchimp';
import mixpanel from '@/platforms/mixpanel';
import monday from '@/platforms/monday';
import outreach from '@/platforms/outreach';
import pipedrive from '@/platforms/pipedrive';
import ringcentral from '@/platforms/ringcentral';
import salesforce from '@/platforms/salesforce';
import salesloft from '@/platforms/salesloft';
import shopify from '@/platforms/shopify';
import shortcut from '@/platforms/shortcut';
import slack from '@/platforms/slack';
import teams from '@/platforms/teams';
import woocommerce from '@/platforms/woocommerce';
import workable from '@/platforms/workable';
import zendesk from '@/platforms/zendesk';
import zoho from '@/platforms/zoho';
import { Platform } from '@/sdk';

export { default as accelo } from '@/platforms/accelo';
export {
  default as activeCampaign,
  types as activeCampaignType,
} from '@/platforms/active-campaign';
export { default as adobe } from '@/platforms/adobe';
export { default as affinity } from '@/platforms/affinity';
export { default as aircall, types as aircallTypes } from '@/platforms/aircall';
export { default as airtable } from '@/platforms/airtable';
export { default as amazon } from '@/platforms/amazon';
export { default as apollo, types as apolloTypes } from '@/platforms/apollo';
export { default as asana } from '@/platforms/asana';
export { default as atlassian } from '@/platforms/atlassian';
export { default as bamboohr } from '@/platforms/bamboohr';
export { default as bitbucket } from '@/platforms/bitbucket';
export { default as boldsign } from '@/platforms/boldsign';
export { default as box } from '@/platforms/box';
export { default as calendly } from '@/platforms/calendly';
export { default as clickup } from '@/platforms/clickup';
export { default as close } from '@/platforms/close';
export { default as customerIo } from '@/platforms/customer.io';
export { default as dialpad, types as dialpadTypes } from '@/platforms/dialpad';
export { default as dropbox } from '@/platforms/dropbox';
export { default as dynamicsSales } from '@/platforms/dynamics-sales';
export { default as factorial } from '@/platforms/factorial';
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
export { default as shortcut } from '@/platforms/shortcut';
export { default as slack, types as slackTypes } from '@/platforms/slack';
export { default as teams, types as teamsTypes } from '@/platforms/teams';
export { default as workable } from '@/platforms/workable';
export { default as zendesk } from '@/platforms/zendesk';
export { default as zoho } from '@/platforms/zoho';
export { default as amplitude } from './amplitude';
export { default as ashby } from './ashby';
export { default as gong } from './gong';
export { default as mixpanel } from './mixpanel';

export const integrationsList: Platform<any, any, any, any, any, any>[] = [
  calendly,
  clickup,
  dropbox,
  factorial,
  atlassian,
  bamboohr,
  bitbucket,
  boldsign,
  box,
  accelo,
  adobe,
  airtable,
  amazon,
  asana,
  shortcut,
  workable,
  gong,
  amplitude,
  ashby,
  mixpanel,
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
