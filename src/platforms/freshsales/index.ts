import { auth, platform } from '@/sdk';
import { client } from './client';
import { icon } from './icon';

export default platform('freshsales', {
  auth: auth.apiToken({
    questions: [
      { type: 'text', id: 'subdomain', label: 'Organization Subdomain' },
    ],
    display: {
      markdown: () =>
        `- Login to Freshsales to find your Organization Subdomain. In your address bar, the subdomain is the first part of the URL. For example, if your URL is https://example-org.myfreshworks.com, your subdomain is "example-org" without quotes.`,
    },
  }),
  display: {
    name: 'Freshsales',
    iconURI: icon,
    logos: {
      defaultURI: icon,
    },
    categories: ['crm'],
  },
  client,
  constants: {},
  actions: {},
});
