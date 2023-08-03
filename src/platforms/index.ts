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
import confluence from '@/platforms/confluence';
import customerIo from '@/platforms/customer.io';
import dialpad from '@/platforms/dialpad';
import dropbox from '@/platforms/dropbox';
import dynamicsSales from '@/platforms/dynamics-sales';
import exactOnline from '@/platforms/exact-online';
import factorial from '@/platforms/factorial';
import freshbooks from '@/platforms/freshbooks';
import freshdesk from '@/platforms/freshdesk';
import freshsales from '@/platforms/freshsales';
import front from '@/platforms/front';
import github from '@/platforms/github';
import gitlab from '@/platforms/gitlab';
import gong from '@/platforms/gong';
import greenhouse from '@/platforms/greenhouse';
import gumroad from '@/platforms/gumroad';
import gusto from '@/platforms/gusto';
import hubspot from '@/platforms/hubspot';
import intercom from '@/platforms/intercom';
import jira from '@/platforms/jira';
import linear from '@/platforms/linear';
import mailchimp from '@/platforms/mailchimp';
import mixpanel from '@/platforms/mixpanel';
import monday from '@/platforms/monday';
import netsuite from '@/platforms/netsuite';
import notion from '@/platforms/notion';
import oneDrive from '@/platforms/one-drive';
import outreach from '@/platforms/outreach';
import pipedrive from '@/platforms/pipedrive';
import ringcentral from '@/platforms/ringcentral';
import salesforce from '@/platforms/salesforce';
import salesloft from '@/platforms/salesloft';
import shopify from '@/platforms/shopify';
import shortcut from '@/platforms/shortcut';
import slack from '@/platforms/slack';
import teams from '@/platforms/teams';
import todoist from '@/platforms/todoist';
import woocommerce from '@/platforms/woocommerce';
import workable from '@/platforms/workable';
import zendesk from '@/platforms/zendesk';
import zoho from '@/platforms/zoho';
import zoom from '@/platforms/zoom';
import google from '@/platforms/google';
import googleCalendar from '@/platforms/google-calendar';
import googleMail from '@/platforms/google-mail';
import googleSheet from '@/platforms/google-sheet';
import healthGorilla from '@/platforms/health-gorilla';
import intuit from '@/platforms/intuit';
import keap from '@/platforms/keap';
import lever from '@/platforms/lever';
import linkedin from '@/platforms/linkedin';
import { Platform } from '@/sdk';
import stripe from './stripe';

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
export { default as confluence } from '@/platforms/confluence';
export { default as customerIo } from '@/platforms/customer.io';
export { default as dialpad, types as dialpadTypes } from '@/platforms/dialpad';
export { default as dropbox } from '@/platforms/dropbox';
export { default as dynamicsSales } from '@/platforms/dynamics-sales';
export { default as exactOnline } from '@/platforms/exact-online';
export { default as factorial } from '@/platforms/factorial';
export { default as freshbooks } from '@/platforms/freshbooks';
export { default as freshdesk } from '@/platforms/freshdesk';
export { default as freshsales } from '@/platforms/freshsales';
export { default as front } from '@/platforms/front';
export { default as github } from '@/platforms/github';
export { default as gitlab } from '@/platforms/gitlab';
export { default as greenhouse } from '@/platforms/greenhouse';
export { default as gumroad } from '@/platforms/gumroad';
export { default as gusto } from '@/platforms/gusto';
export { default as hubspot, types as hubspotTypes } from '@/platforms/hubspot';
export { default as intercom } from '@/platforms/intercom';
export { default as jira } from '@/platforms/jira';
export { default as linear } from '@/platforms/linear';
export {
  default as mailchimp,
  types as mailchimpTypes,
} from '@/platforms/mailchimp';
export { default as monday, types as mondayTypes } from '@/platforms/monday';
export { default as netsuite } from '@/platforms/netsuite';
export { default as notion } from '@/platforms/notion';
export { default as oneDrive } from '@/platforms/one-drive';
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
export { default as todoist } from '@/platforms/todoist';
export { default as workable } from '@/platforms/workable';
export { default as zendesk } from '@/platforms/zendesk';
export { default as zoho } from '@/platforms/zoho';
export { default as zoom } from '@/platforms/zoom';
export { default as amplitude } from './amplitude';
export { default as ashby } from './ashby';
export { default as gong } from './gong';
export { default as mixpanel } from './mixpanel';
export { default as stripe } from './stripe';
export { default as google } from '@/platforms/google';
export { default as googleCalendar } from '@/platforms/google-calendar';
export { default as googleMail } from '@/platforms/google-mail';
export { default as googleSheet } from '@/platforms/google-sheet';
export { default as healthGorilla } from '@/platforms/health-gorilla';
export { default as intuit } from '@/platforms/intuit';
export { default as keap } from '@/platforms/keap';
export { default as lever } from '@/platforms/lever';
export { default as linkedin } from '@/platforms/linkedin';

export const integrationsList: Platform<any, any, any, any, any, any>[] = [
  google,
  googleCalendar,
  googleMail,
  googleSheet,
  healthGorilla,
  intuit,
  keap,
  lever,
  linkedin,
  stripe,
  confluence,
  exactOnline,
  freshbooks,
  front,
  github,
  gitlab,
  greenhouse,
  gumroad,
  gusto,
  jira,
  linear,
  netsuite,
  notion,
  oneDrive,
  todoist,
  zoom,
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
