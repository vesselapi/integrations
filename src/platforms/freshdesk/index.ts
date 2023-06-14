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
        `- Find your Organization Subdomain by first logging into FreshDesk. The subdomain is the first part of the URL. For example, if your URL is https://example.freshdesk.com, your subdomain is "example".`,
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
