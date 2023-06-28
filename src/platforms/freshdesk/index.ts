import { auth, platform } from '@/sdk';
import { client } from './client';
import { icon } from './icon';

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
    iconURI: icon,
    categories: [],
  },
  client,
  constants: {},
  actions: {},
});
