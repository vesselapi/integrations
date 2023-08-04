import { auth, platform } from '@/sdk';
import { client } from './client';
import fullIcon from '@/platforms/freshdesk/logos/full';
import boxIcon from '@/platforms/freshdesk/logos/box';

export default platform('freshdesk', {
  auth: auth.basic({
    questions: [
      { type: 'text', id: 'username', label: 'API Key' },
      { type: 'text', id: 'subdomain', label: 'Organization Subdomain' },
    ],
    display: {
      markdown: () =>
        `- Login to Freshdesk to find your Organization Subdomain. In your address bar, the subdomain is the first part of the URL. For example, if your URL is https://example-org.freshdesk.com, your subdomain is "example-org" without quotes.`,
    },
  }),
  display: {
    name: 'Freshdesk',
    logos: {
        defaultURI: fullIcon ?? boxIcon,
        fullURI: fullIcon,
        boxURI: boxIcon,
    },
    colors: {
        primary: '#d82b00',
    },
    categories: ["crm"],
    },
  client,
  constants: {},
  actions: {},
});
